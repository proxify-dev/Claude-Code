---
title: "Agentic Engineering"
description: "The shift from coding with AI assistance to delegating work to AI agents."
sidebar_position: 1
---

The shift from "coding with AI assistance" to "delegating work to AI agents." This isn't about prompting tricks — it's a different way of working.

## The Mindset Shift

Traditional AI assistance: you write code, AI suggests completions or answers questions.

Agentic engineering: you define the task, the agent plans and executes, you review the output.

The difference is who drives. In agentic engineering, you're the architect and reviewer. The agent is the implementer. Your job shifts from writing code to:

- **Defining clear tasks** with enough context for autonomous execution
- **Setting up guardrails** (CLAUDE.md, hooks, tests) so the agent works within safe boundaries
- **Reviewing output** with the same rigor you'd review a junior developer's PR

## Context Management

The agent's effectiveness is bounded by what it knows. You control that through:

### CLAUDE.md
Project-level context that persists across every session. Commands, architecture, conventions, warnings. See the [CLAUDE.md guide](../setup/claude-md.md).

### Skills
Domain knowledge that loads when relevant. Instead of explaining your testing philosophy every session, encode it in a skill. See the [skills overview](../skills/overview.md). Or jump to [composing a skills stack](../setup/skills-stack.md).

### Conversation context
What you tell Claude in the current session. Be specific. Include error messages, file paths, expected vs. actual behavior. The agent can't read your mind, but it can read your codebase — point it in the right direction.

## Breaking Work Into Agent-Sized Tasks

Not every task is a good fit for full delegation. A good agent task is:

- **Well-defined** — clear success criteria the agent can verify
- **Scoped** — fits within the context window without losing important details
- **Testable** — has tests or a way to verify correctness
- **Reversible** — if it goes wrong, you can undo it (commit before starting)

Bad agent tasks: vague direction ("make this better"), tasks requiring external knowledge Claude doesn't have, tasks where the cost of failure is high and irreversible.

## When to Intervene

Let the agent run when:
- It's making steady progress toward the goal
- Changes are small, incremental, and testable
- You can verify the output

Intervene when:
- The agent is going in circles (repeating the same failed approach)
- It's making changes you didn't ask for (scope creep)
- The approach is fundamentally wrong (wrong architecture, wrong library choice)
- It's about to do something irreversible (force push, drop table, delete branch)

## Delegation Levels

Not everything needs full autonomy. Match the delegation level to the risk:

| Level | You do | Agent does | Example |
|-------|--------|-----------|---------|
| **Suggest** | Decide + implement | Analyze and recommend | "What's the best approach for caching here?" |
| **Draft** | Review + approve | Plan and implement | "Add pagination to the users endpoint. I'll review." |
| **Execute** | Verify after | Plan, implement, and verify | "Fix this failing test and make sure all tests pass." |
| **Autonomous** | Spot check | Full cycle including PR | Background agents, CI agents |

Start at "Suggest" or "Draft" until you build trust with the agent's output in your specific codebase.

## The Brownfield Reality

Most real work is brownfield — existing codebases with history, conventions, tech debt, and implicit knowledge. Agentic engineering in brownfield requires:

- **A good CLAUDE.md** — the agent needs to know your conventions, gotchas, and architecture
- **Tests** — they're the safety net that lets the agent make changes confidently
- **Incremental changes** — small PRs that are easy to review, not massive rewrites
- **Git discipline** — commit before delegating, branch for risky changes, review diffs carefully

The agent doesn't know what it doesn't know. Your job is to fill the gaps with context (CLAUDE.md, skills, conversation) and catch what slips through (review, tests, hooks).

## Further Reading

- [Workflow patterns](workflow-patterns.md) — concrete patterns for common tasks
- [Common pitfalls](../reference/common-pitfalls.md) — mistakes to avoid
- [Official best practices](https://code.claude.com/docs/en/best-practices) — Anthropic's own recommendations
