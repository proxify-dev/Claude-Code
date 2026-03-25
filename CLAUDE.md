# Claude-Code

Proxify's Claude Code plugin — skills, agents, and guides for agentic engineering.

`@docs/` hosts the Mintlify site.

## Repo Structure

This repo is also a **public Claude Code plugin**. Everything in `skills/` and `agents/` ships to engineers who install it. [coming soon]

| Directory | Audience | What goes here |
|-----------|----------|----------------|
| `/skills/` | **Public** — distributed via `npx skills add` | Skills for engineers to install |
| `/agents/` | **Public** — bundled with the plugin | Subagents available to all installers |
| `/docs/` | **Public** — Mintlify site | Guides and references for engineers |
| `/.claude/skills/` | **Internal** — repo maintainers only | Skills for maintaining this repo (not distributed) |
| `/.claude-plugin/plugin.json` | — | Plugin manifest |

**Do not put internal tooling in `skills/` or `agents/`.** Internal skills go in `.claude/skills/`.


## Internal Skills

| Skill | Location | Purpose |
|-------|----------|---------|
| `docs-maintenance` | `.claude/skills/docs-maintenance/` | Voice and editorial judgment for docs pages |

## Internal Agents

| Agent | Location | Purpose |
|-------|----------|---------|
| `docs-architect` | `.claude/agents/docs-architect.md` | User journey, nav structure, gap analysis, content placement |
| `docs-researcher` | `.claude/agents/docs-researcher.md` | Mine `references/` for content on a topic |
| `docs-reviewer` | `.claude/agents/docs-reviewer.md` | Three-Way Test against upstream official docs |

## Docs Workflow

When working on docs, follow this pipeline:

1. **Architect** — Run `docs-architect` to understand structure, find gaps, or decide where content goes
2. **Research** — Run `docs-researcher` to mine `references/` for raw material on the topic
3. **Write** — Use the `docs-maintenance` skill for voice, openers, and editorial judgment
4. **Review** — Run `docs-reviewer` to check the result against upstream official docs

Not every task needs all four steps. Editing voice? Skip to step 3. Adding a new page? Start at step 1.

## Conventions

- Docs use `.mdx` (Mintlify). Skills and agents use `.md`.
- Non-doc content should render natively on GitHub.
- One topic per file, self-contained.
- File names: lowercase, hyphens.
- Prefer bullet points and tables over prose.

## Docs Site

Mintlify site in `docs/`. See **Docs Workflow** above for the full pipeline. The nav config is `docs/docs.json` — the `docs-architect` agent reads it live.

**Before writing docs content:** Check the Three-Way Test in `.claude/skills/docs-maintenance/references/editorial-judgment.md` — include only Proxify-specific opinion, backlink to official Claude Code docs for mechanics, cut generic content.
