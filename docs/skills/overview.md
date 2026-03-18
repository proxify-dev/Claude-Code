---
title: "Skills Overview"
description: "What skills are, how they work, and the three-level loading model."
sidebar_position: 1
---

:::tip[Official reference]
For how Claude Code discovers and loads skills, see the [official skills docs](https://code.claude.com/docs/en/skills).
:::

Skills are reusable knowledge packages that teach Claude domain-specific patterns. They load on demand — only when your task matches the skill's trigger description.

## How Skills Work

Skills use a three-level loading model:

| Level | What | When Loaded | Budget |
|-------|------|-------------|--------|
| Metadata | Name + description | Always in context (skill registry) | ~100 words |
| SKILL.md body | Entry point, routing, core principles | Every time the skill triggers | <500 lines |
| References | Deep docs, scripts, assets | Only when explicitly read | Unlimited |

The metadata description is the trigger — it determines whether the skill fires. The body routes agents to the right reference. References are where the depth lives.

## What's in This Section

- [Using Skills](using-skills.md) — install, browse, and configure skills
- [Creating Skills](creating-skills.md) — build your own skill
- [Distributing Skills](distributing-skills.md) — share skills with others
