# Claude-Code Knowledge Base

Markdown knowledge base for Proxify engineers adopting Claude Code. Guides, skill references, tips, and resources.

## Directory Structure

- `/guides/` — Long-form walkthroughs (getting started, CLAUDE.md writing, skills, workflows, mindset)
- `/skills/` — Reference copies of recommended skills + installation catalog
- `/tips/` — Short focused articles (context management, prompting, pitfalls)
- `/resources/` — External links and glossary

## Content Conventions

- All content is Markdown — one topic per file, self-contained
- Titles use `# Title` (H1), sections use `## Section` (H2)
- Prefer bullet points and tables over prose paragraphs
- Code examples use fenced blocks with language tags
- Internal links use relative paths: `[guide](../guides/getting-started.md)`
- File names: lowercase, hyphens, `.md` extension

## Adding New Content

- Guides → `/guides/` — walkthroughs that teach a concept end-to-end
- Tips → `/tips/` — short reference articles for specific questions
- Resources → `/resources/links.md` (external) or `/resources/glossary.md` (terms)
- New skills → copy into `/skills/<skill-name>/` and add entry to `/skills/catalog.md`

## Dual-Repo Boundary

**This repo contains reference copies of skills, not the originals.**

| Repo | Path | Role |
|------|------|------|
| Personal skills repo | `~/skills/` | Source of truth for custom skills. **Read-only from this project.** |
| Active skills | `~/.claude/skills/` | Symlinks that activate skills in Claude Code sessions |
| This org repo | This project | Proxify knowledge base. **All writes go here.** |

**Rules:**
- Copy skill files into `/skills/<skill-name>/` — never symlink
- Never modify files in `~/skills/` from this project
- If a skill is updated in `~/skills/`, manually refresh the copy here
- `/skills/catalog.md` documents both source location and install instructions

**The boundary rule:** Read from `~/skills/`, write only to this project's `/skills/`. To update an original skill, switch to the `~/skills/` repo.

## Reference Documents

### Skill Architecture — `@skills/skill-architecture/SKILL.md`
**Read when:** Creating or restructuring skills, deciding where knowledge should live

### Agent Development — `@skills/agent-development/SKILL.md`
**Read when:** Creating agents, writing system prompts, configuring MCP servers

### Skills Catalog — `@skills/catalog.md`
**Read when:** Adding a new skill reference or helping an engineer install skills
