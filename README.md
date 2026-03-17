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

## Quick Start

1. [Install Claude Code](docs/getting-started/installation.md)
2. Install Proxify skills: `npx skills add proxify-dev/Claude-Code`
3. [Write your project's CLAUDE.md](docs/guides/claude-md.md)
4. [Learn the workflow patterns](docs/guides/workflow-patterns.md)

## Skills

| Skill | Description |
|-------|-------------|
| [skill-architecture](skills/skill-architecture/SKILL.md) | How to design skills that reach agents at the right time. Covers context efficiency, distribution layers, and framing. |
| [agent-development](skills/agent-development/SKILL.md) | Agent structure, system prompts, triggering conditions, and MCP server configuration for Claude Code. |

## Documentation

### Getting Started
- [Installation](docs/getting-started/installation.md) — Install and launch Claude Code
- [First Session](docs/getting-started/first-session.md) — What to do when you start
- [Key Concepts](docs/getting-started/key-concepts.md) — CLAUDE.md, Skills, Agents, Hooks, MCP
- [Quick Wins](docs/getting-started/quick-wins.md) — Get productive in 10 minutes

### Guides
- [Writing CLAUDE.md](docs/guides/claude-md.md) — The highest-leverage config surface
- [Workflow Patterns](docs/guides/workflow-patterns.md) — Plan-execute, TDD, review, refactoring
- [Context Management](docs/guides/context-management.md) — Stay effective in long sessions
- [Effective Prompting](docs/guides/effective-prompting.md) — Communication patterns that work
- [Agentic Engineering](docs/guides/agentic-engineering.md) — From AI assistance to delegation

### Skills
- [Overview](docs/skills/overview.md) — What skills are and how they work
- [Using Skills](docs/skills/using-skills.md) — Install and browse skills
- [Creating Skills](docs/skills/creating-skills.md) — Build your own skill
- [Distributing Skills](docs/skills/distributing-skills.md) — Share skills with others

### Agents
- [Overview](docs/agents/overview.md) — What agents are and when to use them
- [Creating Agents](docs/agents/creating-agents.md) — Build custom agents
- [Agent Patterns](docs/agents/patterns.md) — Common agent architectures

### Reference
- [Glossary](docs/reference/glossary.md) — Key terms explained
- [Links & Resources](docs/reference/links.md) — Curated external links
- [Common Pitfalls](docs/reference/common-pitfalls.md) — Mistakes to avoid

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
    ├── getting-started/
    ├── guides/
    ├── skills/
    ├── agents/
    └── reference/
```

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
1. Add a markdown file to the appropriate `docs/` subdirectory
2. Update this README with a link
3. Submit a PR
