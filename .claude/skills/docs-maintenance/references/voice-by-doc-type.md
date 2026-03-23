# Voice by Doc Type

Different doc types serve different purposes and use different voice, structure, and openers. Match the type to the directory and intent.

## Doc Types

### Setup docs (`setup/`)

**Purpose:** Get engineers from zero to configured.

**Voice:** Step-by-step, opinionated. Tell them what to do, not every option available.

**Opener:** `<Tip>` backlinking to official docs, then state what this page adds.

**Structure:**
- `<Tip>` backlink to upstream
- One-line statement of what this is and why it matters
- Table or list of key concepts (quick orientation)
- Sections walk through the setup, opinionated choices explained

**Example opener (from `setup/claude-md.mdx`):**
```mdx
<Tip>**New to CLAUDE.md?** — Start with the [official CLAUDE.md guide](...) for the basics. This page is the opinionated blueprint for making yours great.</Tip>
```

### Pattern docs (`patterns/`)

**Purpose:** Teach a mental model or workflow. Explain *why*, not just *how*.

**Voice:** Confident, explanatory. Assumes the reader is experienced but new to agentic workflows.

**Opener:** `<Note>` stating what the reader will learn.

**Structure:**
- `<Note>You'll learn: ...` opener
- Concept introduction (1-2 sentences)
- Quick reference table
- Sections that go deeper, each teaching one facet

**Example opener (from `patterns/agentic-engineering.mdx`):**
```mdx
<Note>**You'll learn:** the mindset shift, how to size tasks for delegation, when to step in, and how to match autonomy to risk.</Note>
```

### Reference docs (`reference/` — non-checklist)

**Purpose:** Quick lookup for known problems or resources.

**Voice:** Direct, problem-oriented. Problem → why it hurts → the fix.

**Opener:** One-line description, then at-a-glance table.

**Structure:**
- One-line description
- "At a Glance" table (quick reference with anchored links)
- `---` separator
- One `##` section per item, each following: the mistake → why it hurts → the fix
- `---` between sections

### Checklist docs (`reference/`)

**Purpose:** Action-only lists. No explanations — links to full guides do that.

**Voice:** Terse. Every line is an action item.

**Opener:** One sentence framing the checklist, then straight into items.

**Structure:**
- One framing sentence
- `- [ ]` items, each with bold action + link to full guide
- No prose between items

## Shared Voice Rules

These apply across all doc types:

- **Second person** — "you", not "the user" or "one"
- **Active voice** — "Write your CLAUDE.md", not "Your CLAUDE.md should be written"
- **No marketing language** — never use "powerful", "seamless", "robust", "cutting-edge"
- **No filler** — cut "it's important to note", "in order to", "additionally"
- **No concluding summaries** — don't restate what was just said
- **Tables for comparisons** — when showing options, levels, or decisions, use a table
- **Bold for emphasis** — not for decoration. Only bold what the reader needs to scan for.
