---
title: "Glossary"
description: "Key terms for working with Claude Code."
sidebar_position: 1
---

Key terms for working with Claude Code.

## Core Concepts

**CLAUDE.md** — A markdown file at the root of your project (or in `~/.claude/`) that gives Claude Code context about your codebase. Loaded into every conversation. The highest-leverage configuration surface.

**Skills** — Reusable knowledge packages that teach Claude domain-specific patterns. Stored in `~/.claude/skills/`. Each skill has a `SKILL.md` entry point and optional reference files. Load on demand when your task matches the skill's trigger description.

**Agents** — Autonomous subprocesses that Claude can spawn to handle complex tasks independently. Defined as markdown files with YAML frontmatter. Each agent has a specialized role, model, tools, and system prompt.

**Hooks** — Shell commands that execute automatically in response to Claude's actions. Used for deterministic enforcement (linting, formatting, blocking certain operations). Configured in `settings.json`.

**MCP (Model Context Protocol)** — A protocol that connects Claude to external tools and services (databases, browsers, APIs). MCP servers can be configured globally or scoped to specific agents.

## Configuration

**`~/.claude/`** — Your personal Claude Code configuration directory. Contains settings, skills, and personal CLAUDE.md.

**`CLAUDE.local.md`** — Personal project overrides that are gitignored. Use for local paths, preferences, or environment-specific instructions.

**`@imports`** — Syntax (`@path/to/file`) in CLAUDE.md that enables inline file expansion. Use for referencing detailed docs without bloating the main file. Supports up to 5 hops of recursion.

**`.claude/rules/*.md`** — Rule files that auto-load with the same priority as CLAUDE.md. Can be path-scoped via YAML `paths` frontmatter.

## Skill Architecture

**SKILL.md** — The entry point of a skill. Contains YAML frontmatter (name, description) and the skill body. The body loads into context every time the skill triggers.

**Trigger description** — The `description` field in a skill's frontmatter. Determines when Claude loads the skill. If the description doesn't match how people ask for help, the skill won't fire.

**Three-level loading** — The token efficiency model for skills: metadata (always loaded, ~100 words), SKILL.md body (loaded on trigger, <500 lines), references (loaded on demand, unlimited).

**Pointer pattern** — The principle that CLAUDE.md should point to detailed docs rather than contain them. One line per concern, linking to where the depth lives.

## Workflow

**`/compact`** — A Claude Code command that summarizes the conversation and frees context. Re-injects CLAUDE.md from disk after compaction.

**Context window** — The total amount of text Claude can process in a single conversation. Shared between system prompt, CLAUDE.md, skills, conversation history, and tool results.

**Plan mode** — A Claude Code mode (`/plan`) that prevents edits until you approve the implementation plan. Useful for non-trivial tasks where you want to review the approach first.

**Brownfield** — An existing codebase with history, conventions, and tech debt, as opposed to a greenfield (new, from-scratch) project. Most real engineering work is brownfield.
