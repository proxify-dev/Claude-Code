---
title: "Quick Wins"
description: "Five things you can do in your first 10 minutes with Claude Code."
sidebar_position: 4
---

Get productive in your first 10 minutes.

## 1. Explore Your Codebase

Ask Claude to explain your project's architecture. It reads your files and gives you a map of how things connect.

> "What does this project do? Walk me through the main modules and how they connect."

## 2. Write a Minimal CLAUDE.md

Create a `CLAUDE.md` at your project root with just the essentials:

```markdown
# MyProject
Next.js app with Prisma ORM and Stripe payments.

## Commands
- `npm run dev`: Dev server
- `npm test`: Run tests
- `npm run lint`: Lint check

## Conventions
- TypeScript strict mode
- Named exports only
```

Even 10 lines makes a noticeable difference in Claude's output quality.

## 3. Try Plan Mode

For any non-trivial task, ask Claude to plan before implementing:

> "I need to add rate limiting to the API. Plan the approach — what middleware to use, where to add it. Don't implement yet."

Or use `/plan` to enter plan mode, which prevents edits until you approve.

## 4. Use `/compact`

After finishing a task, run `/compact` to summarize the conversation and free up context. This keeps Claude sharp for the next task.

## 5. Install a Skill

Skills teach Claude domain-specific patterns. Install one and see the difference:

```bash
npx skills add proxify-dev/Claude-Code@skill-architecture
```

The skill loads automatically when your task matches its domain.

## What's Next

- [CLAUDE.md guide](../guides/claude-md.md) — go deeper on project configuration
- [Workflow patterns](../guides/workflow-patterns.md) — proven patterns for common tasks
- [Agentic engineering](../guides/agentic-engineering.md) — shift from assistance to delegation
