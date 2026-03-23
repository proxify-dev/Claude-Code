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
