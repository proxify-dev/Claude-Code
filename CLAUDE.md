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
| `docs-maintenance` | `.claude/skills/docs-maintenance/` | Editorial conventions for the Mintlify docs site |

## Conventions

- Docs use `.mdx` (Mintlify). Skills and agents use `.md`.
- Non-doc content should render natively on GitHub.
- One topic per file, self-contained.
- File names: lowercase, hyphens.
- Prefer bullet points and tables over prose.

## Docs Site

Mintlify site in `docs/`. The `docs-maintenance` skill covers editorial conventions, directory structure, voice, and component usage.

**Before writing docs content:** Check the Three-Way Test in `.claude/skills/docs-maintenance/references/editorial-judgment.md` — include only Proxify-specific opinion, backlink to official Claude Code docs for mechanics, cut generic content.
