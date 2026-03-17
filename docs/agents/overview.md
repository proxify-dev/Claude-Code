---
title: "Agents Overview"
description: "What agents are, when to use them, and how they differ from skills."
sidebar_position: 1
---

Agents are autonomous subprocesses that Claude can spawn to handle complex, multi-step tasks independently. Each agent runs in its own context with a specialized role, tools, and system prompt.

## When to Use Agents

Agents are for **autonomous work** — tasks where you want Claude to delegate to a specialist subprocess rather than doing everything in the main conversation.

Good fits for agents:
- **Code review** — analyze changes for quality, security, and best practices
- **Test generation** — create comprehensive test suites for new code
- **Exploration** — read many files to answer a question without polluting your main context
- **Documentation** — generate docs from code

## Agents vs. Skills

| | Agents | Skills |
|---|---|---|
| **What they are** | Autonomous subprocesses | Knowledge packages |
| **How they run** | Separate context window | In the main conversation |
| **What they do** | Execute multi-step tasks | Provide domain knowledge |
| **Triggered by** | Description match or explicit invocation | Description match |
| **Context impact** | Isolated — don't pollute main context | Load into main context |

Use **skills** to teach Claude how to do something. Use **agents** to have Claude do something autonomously.

## Agent File Format

Agents are markdown files with YAML frontmatter, stored in the `agents/` directory of a plugin:

```markdown
---
name: agent-identifier
description: Use this agent when [conditions]...
model: inherit
color: blue
---

You are [role]. Your responsibilities are...
```

The markdown body becomes the agent's system prompt.

## What's in This Section

- [Creating Agents](creating-agents.md) — frontmatter, system prompts, MCP configuration
- [Agent Patterns](patterns.md) — common agent archetypes with examples
