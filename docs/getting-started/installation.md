---
title: "Installation"
description: "Install Claude Code and get it running in your project."
sidebar_position: 1
---

## Prerequisites

- Node.js 18+ installed
- A project directory with source code

## Install and Launch

```bash
# Install Claude Code globally
npm install -g @anthropic-ai/claude-code

# Navigate to your project and start
cd your-project
claude
```

Claude Code works best inside an existing project directory. It reads your codebase, understands the context, and helps you make changes.

## Install Proxify Skills

Once Claude Code is running, install the Proxify acceleration toolkit:

```bash
# Install all Proxify skills
npx skills add proxify-dev/Claude-Code

# Or install a specific skill
npx skills add proxify-dev/Claude-Code@skill-architecture
npx skills add proxify-dev/Claude-Code@agent-development
```

## Next Steps

- [Your first session](first-session.md) — what to do when you launch
- [Key concepts](key-concepts.md) — understand the building blocks
