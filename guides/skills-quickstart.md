# Skills Quickstart

Skills are reusable knowledge packages that teach Claude domain-specific patterns. They load on demand — only when your task matches the skill's trigger description.

## How Skills Work

Skills use a three-level loading model:

| Level | What | When Loaded | Budget |
|-------|------|-------------|--------|
| Metadata | Name + description | Always in context (skill registry) | ~100 words |
| SKILL.md body | Entry point, routing, core principles | Every time the skill triggers | <500 lines |
| References | Deep docs, scripts, assets | Only when explicitly read | Unlimited |

The metadata description is the trigger — it determines whether the skill fires. The body routes agents to the right reference. References are where the depth lives.

## Installing a Skill

Skills live in `~/.claude/skills/`. Each skill is a directory with at least a `SKILL.md`:

```bash
# Copy a skill from this repo
cp -r skills/skill-architecture ~/.claude/skills/skill-architecture

# Or symlink to stay in sync
ln -s /path/to/Claude-Code/skills/skill-architecture ~/.claude/skills/skill-architecture
```

After installing, the skill is active in all your Claude Code sessions.

## Browsing Available Skills

- **This repo's skills:** See the [skills catalog](../skills/catalog.md)
- **Community skills:** Browse [skills.sh](https://skills.sh)
- **Install from marketplace:** `npx skills install <skill-name>`

## Anatomy of a Skill

```
skill-name/
├── SKILL.md              (required — router + core principles)
├── references/           (deep docs agents read during execution)
│   ├── topic-a.md
│   └── topic-b.md
├── scripts/              (executable code for deterministic tasks)
│   └── helper.py
└── assets/               (templates, icons, fonts)
    └── template.html
```

### SKILL.md Format

```markdown
---
name: skill-name
description: When to trigger this skill. Be specific — this determines if Claude loads it.
---

# Skill Name

Core insight in 2-3 sentences.

## Which reference do I need?

- **Doing X?** Read [topic-a.md](references/topic-a.md) — covers...
- **Doing Y?** Read [topic-b.md](references/topic-b.md) — covers...
```

The SKILL.md body loads into context every trigger, so keep it lean — route to references for depth.

## Creating Your First Skill

1. Create the directory: `mkdir -p ~/.claude/skills/my-skill/references`
2. Write `SKILL.md` with frontmatter (name + description) and a routing body
3. Add reference files for the deep content
4. Test by starting a Claude Code session and asking about the skill's domain

## Key Principles

- **SKILL.md is a router, not a monolith.** Keep it under 500 lines. Point to references.
- **Description is the trigger.** If the description doesn't match how people ask for help, the skill won't fire.
- **References are self-contained.** An agent reading just one reference file should get actionable guidance.
- **Earn complexity.** Start with a single SKILL.md. Only add references when the body gets too long.

## Deep Dive

For comprehensive skill architecture guidance, see the [skill-architecture skill](../skills/skill-architecture/SKILL.md).
