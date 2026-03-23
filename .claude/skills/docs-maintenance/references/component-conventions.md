# Component Conventions

Which Mintlify components this docs site uses and when. For the full component API, defer to the `mintlify` skill or [mintlify.com/docs/components](https://mintlify.com/docs/components).

## Components in Use

| Component | When to use | Example |
|-----------|-------------|---------|
| `<Tip>` | Backlinks to official docs, actionable advice | Opening backlink in setup docs |
| `<Note>` | "You'll learn" openers on pattern docs | `<Note>You'll learn: the mindset shift...</Note>` |
| `<Warning>` | Destructive actions, critical gotchas | Sparingly — only when ignoring the warning causes real damage |
| `<CardGroup>` + `<Card>` | Hub pages with linked navigation | `index.mdx` landing page |
| `<Tabs>` | Alternative approaches side by side | Include/exclude patterns in setup docs |
| `<Steps>` + `<Step>` | Sequential workflows with distinct stages | `workflow-patterns.mdx` patterns |
| `<AccordionGroup>` + `<Accordion>` | Scannable lists where each item has detail worth collapsing | `common-pitfalls.mdx` pitfall entries |
| `<CodeGroup>` | Related config snippets that share a context | `terminal-setup.mdx` settings tweaks |

## The Sparingly Principle

If plain markdown works, use plain markdown. Components are for structure, not decoration.

Before adding a component, ask: **does this help the reader navigate or understand something that markdown alone can't?**

- A `<Tip>` that links to official docs — yes, it signals "start here first"
- A `<Note>` wrapping a plain sentence — no, just write the sentence
- A `<Tabs>` for two code approaches — yes, it reduces scrolling
- A `<Warning>` on every configuration option — no, it loses its signal

## Components NOT Used

These Mintlify components exist but this site doesn't use them. Don't introduce them without a clear reason:

- `<Expandable>` — if content is worth writing, show it; if not, cut it
- `<ResponseField>` / `<ParamField>` — API reference components, not applicable here
- `<Frame>` — no images in docs currently

## The Backlink Pattern

Setup docs open with a `<Tip>` that links to the official upstream source:

```mdx
<Tip>**New to [topic]?** — Start with the [official guide](url) for the basics. This page is the opinionated [what this adds].</Tip>
```

This signals to the reader: go there for mechanics, stay here for the Proxify opinion layer.

## CardGroup Standard

When using `<CardGroup>`, use `cols={2}` — this is the standard column count across the site.
