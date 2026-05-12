## graphify

This project has a knowledge graph at graphify-out/ with god nodes, community structure, and cross-file relationships.

Rules:
- ALWAYS read graphify-out/GRAPH_REPORT.md before reading any source files, running grep/glob searches, or answering codebase questions. The graph is your primary map of the codebase.
- ALSO read the Obsidian hot notes at ~/Documents/Obsidian Vault/Projects/thryv-marketing-site/wiki/hot.md for current session context, decisions, and project state.
- For cross-module "how does X relate to Y" questions, prefer `~/.local/graphify-env/bin/graphify query "<question>"`, `graphify path "<A>" "<B>"`, or `graphify explain "<concept>"` over grep
- After modifying code, run `~/.local/graphify-env/bin/graphify update .` to keep the graph current (AST-only, no API cost).
- graphify binary: ~/.local/graphify-env/bin/graphify
