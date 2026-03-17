# Skills Directory

This directory contains **reference copies** of recommended Claude Code skills. They serve two purposes:

1. **Documentation** — Read them to learn skill design patterns and agent development
2. **Installation** — Copy them to your `~/.claude/skills/` directory to activate them

## How to Install a Skill

```bash
# Copy a skill directory to your Claude Code skills location
cp -r skills/skill-architecture ~/.claude/skills/skill-architecture
```

Or symlink if you want to stay in sync with this repo:

```bash
ln -s /path/to/Claude-Code/skills/skill-architecture ~/.claude/skills/skill-architecture
```

## Important: These Are Copies

The originals for some skills live in a separate development repo (`~/skills/`). The files here are snapshots copied into this org repo so that:

- Engineers can clone this repo and have everything they need
- No dependency on any individual contributor's local machine
- Content is reviewed and versioned through normal git workflow

If you notice a skill here is outdated compared to the original, update the copy and submit a PR.

## Available Skills

See [catalog.md](catalog.md) for the full list with descriptions and install commands.
