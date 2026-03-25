# Typography & Formatting

Component-level formatting rules for the Mintlify docs site. Voice rules live in [voice-by-doc-type.md](voice-by-doc-type.md) — this file covers how to format content once you know what to write.

## Rules

### Bold lead-ins on list items

Start every list item with a `**Bold phrase**` anchor so readers can scan without reading full sentences.

- **Do:** `- **Preserve context** by keeping exploration out of your main conversation`
- **Don't:** `- Keep exploration out of your main conversation to preserve context`

This is the single highest-leverage formatting rule. Apply it to every bulleted list with 3+ items.

### No horizontal rules

Don't use `---` between sections. Heading hierarchy (`##` → `###` → `####`) provides visual separation — horizontal rules add noise and interfere with Mintlify's built-in spacing.

### No manual prev/next footers

Don't add `**← Prev:** [X](x/) · **Next:** [Y →](y/)` at the bottom of pages. Mintlify generates prev/next navigation automatically from `docs.json`. Manual footers duplicate this and break when pages are reordered.

### Callout type selection

Use the right callout for the right purpose:

| Callout | When to use | Example |
|:--|:--|:--|
| `<Note>` | Context, prerequisites, important clarifications | "Agent Teams is experimental" |
| `<Warning>` | Danger, destructive actions, common failure modes | "Without delegate mode, the lead implements instead of delegating" |
| `<Tip>` | Optional enhancements, best practices, backlinks to official docs | "Use `/plan` mode to enforce this" |

**Placement:** Put callouts *after* the thing they warn about, not as page openers. Exception: the `<Note>**You'll learn:**` opener for pattern docs (defined in voice-by-doc-type.md).

### Tabs for parallel content

Use `<Tabs>` / `<Tab>` when 3+ items share the same structure (e.g., multiple agent types, multiple patterns, multiple configuration options). This replaces long vertical stacks and lets readers jump to what they need.

- **Don't use Tabs** for 2 items — just use headings.
- **Don't use Tabs** when items build on each other sequentially — use numbered steps instead.

### Inline code consistency

Backtick **all** technical identifiers — no exceptions:

- **Field names:** `tools`, `model`, `permissionMode`
- **Paths:** `.claude/agents/`, `~/.claude/agents/`
- **CLI flags:** `--model`, `--agents`
- **Tool names:** `Read`, `Grep`, `Glob`, `Bash`
- **Filenames:** `CLAUDE.md`, `docs.json`, `settings.json`
- **Commands:** `/compact`, `/plan`, `/agents`

### Bold keyboard shortcuts

Always bold keyboard shortcuts and key combinations: **Ctrl+B**, **Shift+Tab**, **Ctrl+T**, **Enter**. Never use inline code for keys.

### In-page TOC

For pages with 4+ major sections, add anchor links in or after the opener so readers can jump directly. Use a sentence with inline links:

```mdx
This page covers [when to use them](#when-to-use), [configuration](#configure), and [examples](#examples).
```
