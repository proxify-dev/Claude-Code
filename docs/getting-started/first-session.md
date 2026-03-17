---
title: "First Session"
description: "What happens when you launch Claude Code and what to try first."
sidebar_position: 2
---

When you launch `claude` in a project directory, it:

1. Reads any `CLAUDE.md` files in the directory hierarchy
2. Loads your personal settings from `~/.claude/`
3. Activates any skills from `~/.claude/skills/`
4. Opens an interactive session where you can ask questions, request changes, or delegate tasks

## Try These First Commands

- **Ask about the codebase:** "What does this project do? Walk me through the architecture."
- **Make a small change:** "Add input validation to the signup form."
- **Run something:** "Run the tests and fix any failures."
- **Explore a module:** "Explain how the auth middleware works end to end."
- **Plan before acting:** "I need to add caching. Plan the approach — don't implement yet."

## What to Expect

Claude reads your files, runs commands, and makes edits — all within your terminal. You review changes via `git diff` before committing, just like reviewing a teammate's work.

## Next Steps

- [Key concepts](key-concepts.md) — CLAUDE.md, Skills, Agents, and more
- [Quick wins](quick-wins.md) — get productive in 10 minutes
