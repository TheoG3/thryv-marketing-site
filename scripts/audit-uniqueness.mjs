#!/usr/bin/env node
/**
 * audit-uniqueness.mjs
 *
 * Walks `dist/` and computes content uniqueness for every programmatic
 * location × service × neighborhood page vs its siblings. Per Nico's
 * 2026-05-21 "Find The Fix" review, the indexing-safe floor is 15%
 * different content between siblings. Pages below that bar are at
 * risk of being treated as duplicates and dropped from the index.
 *
 * Output: docs/audits/uniqueness-report-<date>.md
 *   - One section per (vertical, service) sibling group
 *   - Pairwise Jaccard similarity matrix on cleaned text tokens
 *   - Pages flagged when ≥80% similar to any sibling (i.e. <20% unique)
 *   - Recommended actions per flagged page
 *
 * Usage:
 *   npm run build      # produce dist/
 *   node scripts/audit-uniqueness.mjs
 *
 * Or just:
 *   npm run audit:uniqueness
 */

import { readFileSync, readdirSync, statSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const ROOT = process.cwd();
const DIST = join(ROOT, 'dist');
const OUT_DIR = join(ROOT, 'docs', 'audits');

const SIM_FLAG_THRESHOLD = 0.85; // similarity ≥ 0.85 = uniqueness < 15% = flagged
const STOPWORDS = new Set([
  'the','a','an','and','or','but','of','in','on','at','to','for','with','by',
  'is','it','this','that','as','are','was','be','your','our','we','you','i',
  'from','will','can','have','has','do','does','if','not','no','yes','all',
  'any','more','most','some','one','two','three','out','up','down','off',
]);

/* ── walk dist ─────────────────────────────────────────────── */
function walk(dir, list = []) {
  if (!existsSync(dir)) return list;
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    const st = statSync(full);
    if (st.isDirectory()) walk(full, list);
    else if (name === 'index.html') list.push(full);
  }
  return list;
}

/* ── classify route ────────────────────────────────────────── */
function classify(filePath) {
  const rel = relative(DIST, filePath).replace(/\/index\.html$/, '').replace(/\\/g, '/');
  if (!rel) return null;
  const parts = rel.split('/').filter(Boolean);
  // We only care about programmatic vertical pages here:
  //   [vertical]/[service]/[city]/[neighborhood]
  //   [vertical]/[service]/[city]
  //   [vertical]/[service]
  if (parts.length < 2) return null;
  if (parts[0] === '_es') return null; // skip Spanish duplicate set
  // Skip the static service section
  if (parts[0] === 'services' || parts[0] === 'consulting' || parts[0] === 'blog' || parts[0] === 'case-studies' || parts[0] === 'free-tools' || parts[0] === 'service-area') return null;
  const [vertical, service, city, neighborhood] = parts;
  if (!service || ['blog','case-studies','about','contact','pricing','faq','free-tools','services','consulting'].includes(vertical)) return null;
  return { route: '/' + rel + '/', vertical, service, city, neighborhood };
}

/* ── extract main content text ─────────────────────────────── */
function extractText(html) {
  // Drop scripts / styles / svg / nav / footer / json-ld
  let s = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<nav\b[^>]*>[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<footer\b[^>]*>[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<header\b[^>]*>[\s\S]*?<\/header>/gi, ' ');
  // Strip remaining HTML
  s = s.replace(/<[^>]+>/g, ' ');
  // Decode common entities
  s = s.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
  return s.toLowerCase().replace(/\s+/g, ' ').trim();
}

/* ── tokenize → set of meaningful shingles (3-grams) ───────── */
function shingles(text) {
  const tokens = text.split(/[^a-z0-9]+/).filter(t => t && t.length > 2 && !STOPWORDS.has(t));
  const set = new Set();
  for (let i = 0; i < tokens.length - 2; i++) {
    set.add(tokens[i] + ' ' + tokens[i + 1] + ' ' + tokens[i + 2]);
  }
  return set;
}

/* ── jaccard similarity ───────────────────────────────────── */
function jaccard(a, b) {
  if (!a.size || !b.size) return 0;
  let inter = 0;
  const [small, big] = a.size < b.size ? [a, b] : [b, a];
  for (const x of small) if (big.has(x)) inter++;
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

/* ── group by (vertical, service) ─────────────────────────── */
function groupKey(c) { return `${c.vertical}/${c.service}`; }

/* ── main ─────────────────────────────────────────────────── */
function main() {
  if (!existsSync(DIST)) {
    console.error(`error: ${DIST} not found. Run \`npm run build\` first.`);
    process.exit(1);
  }
  const files = walk(DIST);
  const pages = [];
  for (const f of files) {
    const c = classify(f);
    if (!c) continue;
    if (!c.city) continue; // we only audit city + neighborhood pages
    try {
      const html = readFileSync(f, 'utf-8');
      const text = extractText(html);
      const sh = shingles(text);
      pages.push({ ...c, file: f, tokenCount: sh.size, shingles: sh });
    } catch (e) {
      console.warn(`skip ${f}: ${e.message}`);
    }
  }

  if (!pages.length) {
    console.error('No programmatic pages found under dist/. Did the build run?');
    process.exit(1);
  }

  // Group by (vertical/service)
  const groups = new Map();
  for (const p of pages) {
    const k = groupKey(p);
    if (!groups.has(k)) groups.set(k, []);
    groups.get(k).push(p);
  }

  // Build report
  let totalFlagged = 0;
  let totalPairs = 0;
  let totalGroups = 0;
  const today = new Date().toISOString().slice(0, 10);
  const lines = [];
  lines.push(`# Programmatic Page Uniqueness Audit (${today})`);
  lines.push('');
  lines.push(`Methodology: 3-gram shingle Jaccard similarity on cleaned page content (nav/footer/scripts/SVGs stripped).`);
  lines.push(`Flag threshold: similarity ≥ **${SIM_FLAG_THRESHOLD.toFixed(2)}** (i.e. less than 15% unique content vs a sibling).`);
  lines.push(`Source rule: Nico Gorrono "Find The Fix" review, 2026-05-21 (timestamp 8:28–8:37 in the video).`);
  lines.push('');
  lines.push(`Total programmatic pages audited: **${pages.length}** across **${groups.size}** sibling groups.`);
  lines.push('');

  // Sort groups by size desc for visual scan
  const sortedGroups = [...groups.entries()].sort((a, b) => b[1].length - a[1].length);

  for (const [key, group] of sortedGroups) {
    if (group.length < 2) continue;
    totalGroups++;
    const flagsInGroup = [];
    for (let i = 0; i < group.length; i++) {
      for (let j = i + 1; j < group.length; j++) {
        totalPairs++;
        const sim = jaccard(group[i].shingles, group[j].shingles);
        if (sim >= SIM_FLAG_THRESHOLD) {
          totalFlagged++;
          flagsInGroup.push({ a: group[i].route, b: group[j].route, sim });
        }
      }
    }
    if (flagsInGroup.length === 0) continue;
    lines.push(`## ⚠ ${key} (${group.length} sibling pages, ${flagsInGroup.length} flagged pairs)`);
    lines.push('');
    lines.push(`| Page A | Page B | Similarity | Unique % |`);
    lines.push(`|---|---|---:|---:|`);
    flagsInGroup
      .sort((x, y) => y.sim - x.sim)
      .forEach(f => {
        lines.push(`| ${f.a} | ${f.b} | ${(f.sim * 100).toFixed(1)}% | ${((1 - f.sim) * 100).toFixed(1)}% |`);
      });
    lines.push('');
    lines.push(`**Action:** Add place-specific content to each flagged page until uniqueness exceeds 15%. Suggested levers:`);
    lines.push(`- Neighborhood-specific operational detail (zip codes, landmarks, demographic notes)`);
    lines.push(`- Local FAQ items naming nearby competitors or local search patterns`);
    lines.push(`- Place-specific case study sketch or hypothetical scenario`);
    lines.push(`- Localized testimonial or signal block where available`);
    lines.push('');
  }

  if (totalFlagged === 0) {
    lines.push('## ✅ No pages flagged');
    lines.push('');
    lines.push(`All ${totalPairs} sibling pairs cleared the ${(SIM_FLAG_THRESHOLD * 100).toFixed(0)}% similarity ceiling.`);
  } else {
    lines.unshift('');
    lines.unshift(`> **${totalFlagged} flagged pairs across ${totalGroups} sibling groups** out of ${totalPairs} pairs audited.`);
  }

  if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
  const outFile = join(OUT_DIR, `uniqueness-report-${today}.md`);
  writeFileSync(outFile, lines.join('\n'));
  console.log(`wrote ${relative(ROOT, outFile)}`);
  console.log(`audited ${pages.length} pages, ${totalPairs} pairs, flagged ${totalFlagged}.`);
}

main();
