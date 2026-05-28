#!/usr/bin/env node
/**
 * Local validation harness for the ADA scanner worker.
 * Tests: SSRF guard, PSI fallback, score math.
 * Does NOT test Browser Rendering (CF-only) or KV (CF-only).
 * Run: node test-local.js
 */

import { readFileSync } from 'fs';
import { createRequire } from 'module';

// ─── inline the sanitizeUrl and summarizeAxe logic for unit testing ───────────

function sanitizeUrl(raw) {
  if (!raw || typeof raw !== 'string') return null;
  let s = raw.trim();
  if (/^[a-zA-Z][a-zA-Z0-9+\-.]*:\/\//i.test(s) && !/^https?:\/\//i.test(s)) return null;
  if (!/^https?:\/\//i.test(s)) s = 'https://' + s;
  let u;
  try { u = new URL(s); } catch { return null; }
  if (!/^https?:$/.test(u.protocol)) return null;
  const host = u.hostname.toLowerCase();
  const labels = host.split('.');
  if (host === 'localhost' || labels.includes('local') || labels.includes('internal')) return null;
  if (host === 'metadata.google.internal') return null;
  if (host.includes(':')) return null;
  const m = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (m) {
    const a = +m[1], b = +m[2];
    if (a === 10 || a === 127 || a === 0 || a >= 224 ||
        (a === 192 && b === 168) || (a === 172 && b >= 16 && b <= 31) || (a === 169 && b === 254)) return null;
  }
  return u.toString();
}

const IMPACT_WEIGHT = { critical: 15, serious: 10, moderate: 4, minor: 1 };

function summarizeAxe(violations) {
  const severities = { critical: 0, serious: 0, moderate: 0, minor: 0 };
  let penalty = 0;
  for (const v of violations) {
    const imp = v.impact || 'minor';
    severities[imp] = (severities[imp] || 0) + 1;
    penalty += (IMPACT_WEIGHT[imp] || 1);
  }
  return { score: Math.max(0, 100 - penalty), severities };
}

// ─── SSRF test cases ──────────────────────────────────────────────────────────

const SSRF_CASES = [
  // must be BLOCKED (return null)
  { url: 'http://localhost',           expect: null },
  { url: 'http://localhost:8080/foo',  expect: null },
  { url: 'http://127.0.0.1',          expect: null },
  { url: 'http://0.0.0.0',            expect: null },
  { url: 'http://10.0.0.1',           expect: null },
  { url: 'http://10.255.255.255',      expect: null },
  { url: 'http://192.168.1.1',         expect: null },
  { url: 'http://172.16.0.1',          expect: null },
  { url: 'http://172.31.255.255',      expect: null },
  { url: 'http://169.254.169.254',     expect: null }, // AWS/GCP metadata
  { url: 'http://metadata.google.internal', expect: null },
  { url: 'http://host.local',          expect: null },
  { url: 'http://internal.service',    expect: null },
  { url: 'http://[::1]',              expect: null }, // IPv6 literal
  { url: 'http://[fc00::1]',          expect: null }, // IPv6 literal
  { url: 'ftp://example.com',          expect: null }, // wrong protocol
  { url: '',                           expect: null },
  { url: null,                         expect: null },
  { url: 'not-a-url',                  expect: 'https://not-a-url/' }, // gets https prefix — may or may not resolve, but passes SSRF
  // must be ALLOWED
  { url: 'https://example.com',        expect: 'https://example.com/' },
  { url: 'http://example.com',         expect: 'http://example.com/' },
  { url: 'example.com',               expect: 'https://example.com/' },
  { url: 'https://thryvmarketingsolutions.com', expect: 'https://thryvmarketingsolutions.com/' },
  { url: 'https://8.8.8.8',            expect: 'https://8.8.8.8/' }, // public IP — allowed
];

// ─── score math tests ─────────────────────────────────────────────────────────

const SCORE_CASES = [
  { violations: [], expectedScore: 100 },
  { violations: [{ impact: 'critical' }], expectedScore: 85 },
  { violations: [{ impact: 'critical' }, { impact: 'serious' }, { impact: 'moderate' }], expectedScore: 71 },
  { violations: Array(8).fill({ impact: 'critical' }), expectedScore: 0 }, // floored at 0
];

// ─── PSI live test (real network) ─────────────────────────────────────────────

async function testPSI(apiKey) {
  const target = 'https://example.com';
  const url = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(target)}&category=ACCESSIBILITY&strategy=mobile&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) return { ok: false, status: res.status };
  const data = await res.json();
  const score = Math.round(((data.lighthouseResult?.categories?.accessibility?.score) || 0) * 100);
  return { ok: true, score, target };
}

// ─── runner ───────────────────────────────────────────────────────────────────

let pass = 0, fail = 0;

function check(name, got, expected) {
  if (JSON.stringify(got) === JSON.stringify(expected)) {
    console.log(`  ✅ ${name}`);
    pass++;
  } else {
    console.log(`  ❌ ${name}`);
    console.log(`     expected: ${JSON.stringify(expected)}`);
    console.log(`     got:      ${JSON.stringify(got)}`);
    fail++;
  }
}

console.log('\n=== SSRF guard tests ===');
for (const { url, expect } of SSRF_CASES) {
  const got = sanitizeUrl(url);
  check(String(url), got, expect);
}

console.log('\n=== Score math tests ===');
for (const { violations, expectedScore } of SCORE_CASES) {
  const { score } = summarizeAxe(violations);
  check(`${violations.length} violations → score ${expectedScore}`, score, expectedScore);
}

const apiKey = process.env.GOOGLE_PAGESPEED_API_KEY || process.env.PSI_API_KEY;
if (apiKey) {
  console.log('\n=== PSI live test (real network) ===');
  try {
    const r = await testPSI(apiKey);
    if (r.ok) {
      console.log(`  ✅ PSI returned score ${r.score} for ${r.target}`);
      pass++;
    } else {
      console.log(`  ❌ PSI returned HTTP ${r.status}`);
      fail++;
    }
  } catch (e) {
    console.log(`  ❌ PSI threw: ${e.message}`);
    fail++;
  }
} else {
  console.log('\n=== PSI live test SKIPPED (no GOOGLE_PAGESPEED_API_KEY in env) ===');
}

console.log(`\n${'─'.repeat(40)}`);
console.log(`Results: ${pass} passed, ${fail} failed`);
if (fail > 0) process.exit(1);
