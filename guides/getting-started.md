# Getting Started with Claude Code

Your first session with Claude Code — from installation to completing your first real task.

## Installation

```bash
# Install Claude Code globally
npm install -g @anthropic-ai/claude-code

# Navigate to your project and start
cd your-project
claude
```

Claude Code works best inside an existing project directory. It reads your codebase, understands the context, and helps you make changes.

## Your First Session

When you launch `claude` in a project directory, it:

1. Reads any `CLAUDE.md` files in the directory hierarchy
2. Loads your personal settings from `~/.claude/`
3. Activates any skills from `~/.claude/skills/`
4. Opens an interactive session where you can ask questions, request changes, or delegate tasks

### Try these first commands

- **Ask about the codebase:** "What does this project do? Walk me through the architecture."
- **Make a small change:** "Add input validation to the signup form."
- **Run something:** "Run the tests and fix any failures."

## Key Concepts

### CLAUDE.md

A markdown file at the root of your project that gives Claude context about your codebase. Think of it as onboarding docs for your AI pair programmer. See the [CLAUDE.md guide](claude-md-guide.md) for how to write an effective one.

### Skills

Reusable knowledge packages that teach Claude domain-specific patterns. They load on demand — only when relevant to your task. See the [skills quickstart](skills-quickstart.md).

### Agents

Autonomous subprocesses that handle complex, multi-step tasks independently. Claude can spawn specialized agents for code review, testing, exploration, and more. See the [agent development skill](../skills/agent-development/SKILL.md).

### Hooks

Shell commands that execute automatically in response to Claude's actions (before/after tool calls, on notification, etc.). Use hooks for deterministic enforcement — things that must always happen, like linting or formatting.

### MCP (Model Context Protocol)

A protocol that lets Claude connect to external tools and services — databases, browsers, APIs, and more. MCP servers can be configured globally or scoped to specific agents.

## The Context Window

Claude Code has a large context window, but it's not infinite. Good habits:

- **Start focused:** Give Claude a clear, specific task rather than a vague direction
- **Use `/compact`** when the conversation gets long — it summarizes and frees up context
- **Use `@imports`** in CLAUDE.md to point to detailed docs that load on demand
- **Break large tasks into steps:** Plan first, then execute step by step

## What's Next

- [Write your project's CLAUDE.md](claude-md-guide.md)
- [Install your first skill](skills-quickstart.md)
- [Learn workflow patterns](workflow-patterns.md)
- [Shift your mindset to agentic engineering](agentic-engineering.md)
