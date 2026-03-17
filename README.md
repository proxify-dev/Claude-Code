# Claude-Code

Proxify's Claude Code acceleration toolkit. Skills, agents, and guides for agentic engineering.

## Install

```bash
# Install all skills
npx skills add proxify-dev/Claude-Code

# Install a specific skill
npx skills add proxify-dev/Claude-Code@skill-architecture
npx skills add proxify-dev/Claude-Code@agent-development
```

## Skills

| Skill | Description |
|-------|-------------|
| [skill-architecture](skills/skill-architecture/SKILL.md) | How to design skills that reach agents at the right time. Covers context efficiency, distribution layers, and framing. |
| [agent-development](skills/agent-development/SKILL.md) | Agent structure, system prompts, triggering conditions, and MCP server configuration for Claude Code. |

## Plugin Structure

This repo is a Claude Code plugin. It distributes:

- **Skills** (`skills/`) — installed via `npx skills add`
- **Agents** (`agents/`) — bundled subagents (coming soon)
- **Docs** (`docs/`) — guides and references for engineers

```
Claude-Code/
├── .claude-plugin/plugin.json    # Plugin manifest
├── skills/                       # Distributable skills
├── agents/                       # Bundled agents (future)
└── docs/                         # Guides and resources
```

## Documentation

### Getting Started
- [Getting Started](docs/getting-started.md) — Installation, first session, key concepts
- [Writing CLAUDE.md](docs/claude-md-guide.md) — The highest-leverage config for Claude Code
- [Skills Quickstart](docs/skills-quickstart.md) — Install, use, create, and distribute skills

### Workflows & Patterns
- [Workflow Patterns](docs/workflow-patterns.md) — Plan-then-execute, TDD, refactoring, code review
- [Agentic Engineering](docs/agentic-engineering.md) — The mindset shift from AI assistance to delegation

### Tips
- [Context Management](docs/context-management.md) — Keep Claude effective in long sessions
- [Effective Prompting](docs/effective-prompting.md) — Communication patterns that work
- [Common Pitfalls](docs/common-pitfalls.md) — Mistakes to avoid when starting out

### Reference
- [Links & Resources](docs/links.md) — Curated links to docs, tools, and community
- [Glossary](docs/glossary.md) — Key terms explained

## Quick Start

1. [Install Claude Code](docs/getting-started.md)
2. Install Proxify skills: `npx skills add proxify-dev/Claude-Code`
3. [Write your project's CLAUDE.md](docs/claude-md-guide.md)
4. [Learn the workflow patterns](docs/workflow-patterns.md)

## Contributing

### Add a skill
1. Create `skills/<skill-name>/SKILL.md` with valid frontmatter
2. Add `references/` for deep content
3. Submit a PR — becomes installable via `npx skills add proxify-dev/Claude-Code@<skill-name>`

### Add an agent
1. Create `agents/<agent-name>.md` with frontmatter (name, description, model, color)
2. Write the system prompt as the markdown body
3. Submit a PR

### Add documentation
1. Add a markdown file to `docs/`
2. Update this README with a link
3. Submit a PR
