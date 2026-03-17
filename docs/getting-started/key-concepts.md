---
title: "Key Concepts"
description: "Core building blocks of Claude Code: CLAUDE.md, Skills, Agents, Hooks, and MCP."
sidebar_position: 3
---

## CLAUDE.md

A markdown file at the root of your project that gives Claude context about your codebase. Think of it as onboarding docs for your AI pair programmer. See the [CLAUDE.md guide](../guides/claude-md.md) for how to write an effective one.

## Skills

Reusable knowledge packages that teach Claude domain-specific patterns. They load on demand — only when relevant to your task. See the [skills overview](../skills/overview.md).

## Agents

Autonomous subprocesses that handle complex, multi-step tasks independently. Claude can spawn specialized agents for code review, testing, exploration, and more. See the [agents overview](../agents/overview.md).

## Hooks

Shell commands that execute automatically in response to Claude's actions (before/after tool calls, on notification, etc.). Use hooks for deterministic enforcement — things that must always happen, like linting or formatting.

## MCP (Model Context Protocol)

A protocol that lets Claude connect to external tools and services — databases, browsers, APIs, and more. MCP servers can be configured globally or scoped to specific agents.

## Next Steps

- [Quick wins](quick-wins.md) — get productive fast
- [Write your CLAUDE.md](../guides/claude-md.md) — the highest-leverage thing you can do
