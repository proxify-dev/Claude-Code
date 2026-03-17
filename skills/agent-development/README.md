# agent-development (local fork)

Local fork of [`anthropics/claude-code@agent-development`](https://skills.sh/anthropics/claude-code/agent-development).

## What changed from upstream

Our version extends the published skill with **MCP server configuration** — a frontmatter field (`mcpServers`) that the upstream skill does not document at all.

### Differences at a glance

| Area | Upstream | Ours |
|------|----------|------|
| `name` frontmatter | `Agent Development` (title case) | `agent-development` (kebab-case) |
| Trigger terms in `description` | 9 trigger phrases | +2: `"mcpServers"`, `"MCP in agents"` |
| Description guidance areas | agent structure, system prompts, triggering conditions | +`MCP server configuration` |
| Key concepts | 5 bullets | +1: MCP server scoping (inline vs string ref) |
| Complete Format example | `tools` only | +`mcpServers` with inline & string ref examples |
| `mcpServers` section | **missing** | Full section (~60 lines) covering both forms, behavior comparison table, combining forms, interaction with `tools` |
| Frontmatter summary table | 5 rows | +1 row for `mcpServers` |

### The mcpServers addition in detail

The new section documents two distinct forms:

1. **Inline definition** — spins up a scoped MCP server that lives only for the subagent's lifetime (e.g. Playwright, database). The main conversation never sees these tools.
2. **String reference** — reuses an already-active server from the parent session (e.g. `github`). Disabling it via `/mcp` in the main session breaks the subagent's access.

It also covers combining both forms and how `mcpServers` interacts with the `tools` field.

### Supporting files

All reference files, examples, and scripts are **identical** to upstream:

- `references/system-prompt-design.md`
- `references/triggering-examples.md`
- `references/agent-creation-system-prompt.md`
- `examples/agent-creation-prompt.md`
- `examples/complete-agent-examples.md`
- `scripts/validate-agent.sh`

## Upstream source

- **Repo:** [`anthropics/claude-code`](https://github.com/anthropics/claude-code) at `plugins/plugin-dev/skills/agent-development/`
- **Skills.sh:** https://skills.sh/anthropics/claude-code/agent-development
