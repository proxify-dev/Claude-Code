---
title: "Context Management"
description: "How to keep Claude Code effective across long sessions and large codebases."
sidebar_position: 3
---

How to keep Claude Code effective across long sessions and large codebases.

## The Context Window

Claude Code has a large context window, but it's shared between:
- System prompt (~50 instructions)
- CLAUDE.md files (loaded at launch)
- Active skill content (loaded on trigger)
- Your conversation history
- Tool results (file reads, command output, search results)

As the window fills, older messages get compressed. This is automatic, but you can manage it proactively.

## `/compact`

When the conversation gets long or unfocused, run `/compact`. It:
- Summarizes the conversation so far
- Frees context for new work
- Re-injects CLAUDE.md from disk (so your instructions survive)

**Use it between tasks.** Finished a bug fix and moving to a new feature? Compact first.

## `@imports` in CLAUDE.md

The `@path/to/file` syntax in CLAUDE.md enables inline file expansion. Use it for detailed docs that shouldn't be in the main CLAUDE.md body:

```markdown
## Reference Documents
### API Architecture — `@docs/api-architecture.md`
**Read when:** Adding or modifying API endpoints
```

This keeps CLAUDE.md lean while making deep docs accessible on demand. Supports up to 5 hops of recursion.

## Strategies for Large Codebases

- **Break work into focused sessions.** Don't try to refactor 20 files in one conversation.
- **Point Claude to specific files.** "Look at `src/auth/middleware.ts`" is better than "find the auth code."
- **Use agents for exploration.** The Explore agent reads many files without polluting your main context.
- **Commit between tasks.** Gives you a clean rollback point and lets you `/compact` without losing work.

## Signs You're Running Low on Context

- Claude starts forgetting earlier instructions or decisions
- Responses become less specific or start repeating generic advice
- Claude asks questions you already answered
- Tool results are getting truncated

When you notice these, `/compact` and refocus.

## The Token Budget Mental Model

Think of your context window as a budget:
- CLAUDE.md: fixed cost (loaded every time)
- Skills: pay-per-use (loaded when triggered)
- Conversation: growing cost (accumulates)
- Tool results: variable cost (some reads are cheap, some are expensive)

The cheapest way to give Claude information is through CLAUDE.md pointers and skills. The most expensive is pasting large files into the chat.
