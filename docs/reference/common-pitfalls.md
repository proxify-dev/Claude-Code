---
title: "Common Pitfalls"
description: "Mistakes engineers make when starting with Claude Code — and how to avoid them."
sidebar_position: 3
---

Mistakes engineers make when starting with Claude Code — and how to avoid them.

## Overloading CLAUDE.md

**The mistake:** Putting everything into CLAUDE.md — full API docs, code examples, style guides, deployment procedures.

**Why it hurts:** Every token in CLAUDE.md is loaded into every conversation. A 500-line CLAUDE.md eats your context budget and dilutes the important instructions.

**The fix:** Keep CLAUDE.md under 200 lines. Use the pointer pattern — one line per concern with a link to the full doc. Deep knowledge goes in skills or reference files.

## Not Having a CLAUDE.md at All

**The mistake:** Jumping straight into using Claude Code without writing a CLAUDE.md.

**Why it hurts:** Claude doesn't know your conventions, commands, or architecture. It makes assumptions that may not match your project.

**The fix:** Spend 15 minutes writing even a basic CLAUDE.md with your tech stack, commands, and top 3 conventions. It pays off immediately.

## Fighting the Agent Instead of Guiding It

**The mistake:** Repeating the same instruction when Claude goes in the wrong direction, sometimes in ALL CAPS or with "IMPORTANT!!!".

**Why it hurts:** The issue is usually missing context, not missing emphasis. More exclamation marks don't help.

**The fix:** Step back and ask: what context is Claude missing? Provide it. If the approach is fundamentally wrong, explain why and suggest an alternative rather than insisting harder.

## Delegating Without Tests

**The mistake:** Asking Claude to make changes in a codebase with no tests, then hoping everything works.

**Why it hurts:** Without tests, neither you nor Claude can verify that changes are correct. You're flying blind.

**The fix:** Write tests first (or have Claude write them). Tests are the safety net that makes delegation safe.

## Skipping the Review

**The mistake:** Accepting Claude's changes without reading the diff.

**Why it hurts:** Claude may change more than you asked for, introduce subtle bugs, or make different architectural choices than you'd prefer.

**The fix:** Always review diffs. Use `git diff` before committing. Treat Claude's output like a PR from a capable but new team member.

## Not Using `/compact`

**The mistake:** Running entire work sessions in a single conversation without ever compacting.

**Why it hurts:** The context fills up, Claude starts forgetting earlier decisions, and quality degrades.

**The fix:** `/compact` between tasks. Finished a bug fix? Compact before starting the next feature.

## Trying to Do Everything at Once

**The mistake:** "Refactor the entire auth module, add OAuth support, migrate to the new database schema, and update all the tests."

**Why it hurts:** Too many moving parts. If something goes wrong, it's hard to tell which change caused it.

**The fix:** One task at a time. Commit between tasks. Each change should be reviewable on its own.

## Ignoring the Dual-Repo Boundary

**The mistake:** (For skill developers) Editing skill source files from the wrong repo context.

**Why it hurts:** Changes end up in the wrong place, or get overwritten when syncing.

**The fix:** Know which repo you're in. Skill originals live in `~/skills/`. Reference copies live in this org repo. Update originals first, then sync copies.
