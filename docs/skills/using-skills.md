---
title: "Using Skills"
description: "How to install, browse, and use skills in Claude Code."
sidebar_position: 2
---

## Installing Skills

### From this repo (Proxify skills)

```bash
# Install all Proxify skills
npx skills add proxify-dev/Claude-Code

# Install a specific skill
npx skills add proxify-dev/Claude-Code@skill-architecture
npx skills add proxify-dev/Claude-Code@agent-development
```

### From the community

```bash
# Browse available skills
npx skills search <keyword>

# Install from any public repo
npx skills add owner/repo
npx skills add owner/repo@specific-skill
```

Skills get installed to `~/.claude/skills/<name>/` (global) or `.claude/skills/<name>/` (project-level). After installing, the skill is active in your Claude Code sessions.

## Browsing Available Skills

- **Proxify skills:** See the [skills/](../../skills/) directory in this repo
- **Community directory:** Browse [skills.sh](https://skills.sh)
