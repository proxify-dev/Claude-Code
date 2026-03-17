# Claude-Code

Proxify's Claude Code acceleration plugin — skills, agents, and guides for agentic engineering.

## Install

```bash
npx skills add proxify-dev/Claude-Code
```

## Plugin Structure

- `/skills/` — Distributable skills (discovered by `npx skills add`)
- `/agents/` — Bundled subagents (future)
- `/docs/` — Guides, tips, and resources for engineers
- `/.claude-plugin/plugin.json` — Plugin manifest

## Available Skills

| Skill | Install |
|-------|---------|
| `skill-architecture` | `npx skills add proxify-dev/Claude-Code@skill-architecture` |
| `agent-development` | `npx skills add proxify-dev/Claude-Code@agent-development` |

## Content Conventions

- All content is Markdown — one topic per file, self-contained
- Prefer bullet points and tables over prose
- File names: lowercase, hyphens, `.md` extension
- Internal links use relative paths

## Adding a New Skill

1. Create `skills/<skill-name>/SKILL.md` with valid frontmatter (`name` must match directory name)
2. Add `references/` subdirectory for deep content if needed
3. The skill becomes installable via `npx skills add proxify-dev/Claude-Code@<skill-name>`
4. skills.sh auto-discovers it once pushed to GitHub

## Adding an Agent

1. Create `agents/<agent-name>.md` with YAML frontmatter (name, description, model, color)
2. Write the system prompt as the markdown body
3. The agent is bundled with the plugin

## Adding Documentation

- Add new docs to `/docs/`
- Update README.md with a link

## Dual-Repo Boundary

| Repo | Path | Role |
|------|------|------|
| Personal skills | `~/skills/` | Source of truth for custom skills. **Read-only from this project.** |
| Active skills | `~/.claude/skills/` | Where `npx skills add` installs to |
| This org repo | This project | Proxify plugin + knowledge base. **All writes go here.** |

**The boundary rule:** Read from `~/skills/`, write only to this project. To update an original skill, switch to `~/skills/`.

## Reference Documents

### Skill Architecture — `@skills/skill-architecture/SKILL.md`
**Read when:** Creating or restructuring skills, deciding where knowledge should live

### Agent Development — `@skills/agent-development/SKILL.md`
**Read when:** Creating agents, writing system prompts, configuring MCP servers
