# Editorial Judgment

How to decide what belongs in this docs site, what gets a backlink, and what gets cut.

## Audience

Brownfield engineers at Proxify who already know how to code. They're learning delegation patterns and agentic workflows — not programming basics. Write for someone who tunes their tools like build pipelines.

## The Three-Way Test

Every piece of content gets one of three dispositions:

| Disposition | Test | Action |
|-------------|------|--------|
| **Include** | Proxify-specific, teaches delegation mindset, or context an agent needs to execute correctly | Write the full content |
| **Backlink** | Better maintained upstream (official Claude Code docs, a skill, an external tool's docs) | Link to it, add only the Proxify opinion layer |
| **Cut** | Applies equally to any developer using Claude Code on any project | Don't write it. Generic advice belongs upstream. |

## Worked Examples

**"How to use `/compact`"** → **Cut.** This is generic Claude Code usage. The official docs cover it. Writing it here adds maintenance burden with no Proxify-specific value.

**"How Proxify's skills stack composes"** → **Include.** This is specific to the Proxify plugin and teaches engineers how to install and layer the skills we distribute. No upstream source covers this.

**"Writing effective CLAUDE.md files"** → **Backlink.** The [official CLAUDE.md guide](https://code.claude.com/docs/en/memory) covers mechanics. Our page (`setup/claude-md.mdx`) opens with a `<Tip>` linking there, then adds the opinionated blueprint (200-line budget, pointer pattern, what goes where).

**"Common pitfalls when starting with Claude Code"** → **Include.** While some pitfalls are generic, the curation and fixes are opinionated — reflecting Proxify's specific adoption experience.

**"MCP server configuration syntax"** → **Backlink.** Link to official MCP docs. Only cover Proxify-recommended MCP setups.

## The Backlink Pattern

When backlinking, the doc should open with a `<Tip>` that points to the upstream source, then immediately state what this page adds:

```mdx
<Tip>**New to CLAUDE.md?** — Start with the [official CLAUDE.md guide](https://code.claude.com/docs/en/memory) for the basics. This page is the opinionated blueprint for making yours great.</Tip>
```

After the backlink, write only the opinion layer — the parts that are specific to how Proxify engineers work. Don't restate what the official docs already explain.

## Internal Cross-Linking

Upstream backlinks point readers to official docs. Internal cross-links connect pages **within this site** so readers can orient between the "why" (Mindset pages) and the "how" (Setup pages).

### When to cross-link

Every time a page references another page's concept — link to it. If page A mentions skills triggering, it should link to the skills page. If the skills page explains mechanics that only make sense with the distribution architecture, it should link back.

### Bidirectional links

Links should work in both directions:

- **Mindset → Setup:** "Here's why this layer exists. [Set it up →](/setup/...)"
- **Setup → Mindset:** "For how this fits into the broader architecture, see [Context Distribution](/patterns/...)"

A reader landing on any page should be able to reach the related pages without going through the sidebar.

### Where to place internal links

| Location | Use for |
|----------|---------|
| **Inline in prose** | When you mention another page's concept ("See [Writing CLAUDE.md](/setup/claude-md) for the full blueprint") |
| **Table cells** | When a table row references a tool or layer the reader can learn more about |
| **End of a `<Tab>` or section** | As a forward link to the setup/detail page for that topic |
| **`<Tip>` callout** | When grouping multiple forward links ("Ready to set this up? See [X] and [Y]") |

### What not to do

- Don't link every mention — link the first or most prominent one per section
- Don't create circular links where two pages just point at each other with no additional value
- Don't duplicate content across pages and link between copies — one page owns the content, the other links to it

## The Density Test

After writing or editing a section, ask: **if I remove this paragraph, does the doc still teach the same thing?** If yes, cut the paragraph. Every line should earn its place.

Signs of low density:
- Restating the description as the opening paragraph
- Concluding summaries that repeat what was just said
- Transitions like "let's now look at" or "as mentioned above"
- Explaining a concept that the linked official docs already cover

## When in Doubt

If you're unsure whether content belongs, check:
1. Does the official Claude Code docs already cover this? → Backlink
2. Would this help any Claude Code user, not just Proxify engineers? → Cut
3. Does it teach something about how Proxify specifically approaches this? → Include

## Checking Upstream

Before writing content about a Claude Code feature, verify what the official docs already cover. Use the `docs-reviewer` agent (`.claude/agents/docs-reviewer.md`) to compare against the local mirror at `~/.claude-code-docs/docs/`:

```
"Use the docs-reviewer agent to check this page against upstream"
```

The mirror auto-syncs from the [community docs repo](https://github.com/ericbuess/claude-code-docs). Each file maps 1:1 to an official page — e.g., `sub-agents.md` → `https://docs.anthropic.com/en/docs/claude-code/sub-agents`.
