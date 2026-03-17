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

### Browsing available skills

- **Proxify skills:** See the [skills/](../skills/) directory in this repo
- **Community directory:** Browse [skills.sh](https://skills.sh)

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

## Distributing Skills

To make your skills installable via `npx skills add`:

1. Create a public GitHub repo with a `skills/` directory at root
2. Each subdirectory of `skills/` containing a `SKILL.md` is a distributable skill
3. The `name` field in SKILL.md frontmatter must match the directory name
4. No registration needed — skills.sh auto-discovers public repos

```
your-repo/
└── skills/
    ├── my-first-skill/
    │   └── SKILL.md
    └── my-second-skill/
        ├── SKILL.md
        └── references/
```

Engineers install with: `npx skills add your-github-handle/your-repo`

### Plugins: Beyond Skills

A repo can be a full Claude Code **plugin** that bundles skills alongside other components:

```
my-plugin/
├── .claude-plugin/plugin.json    # Plugin manifest
├── skills/                       # Skills (npx skills add)
├── agents/                       # Subagents
├── commands/                     # Slash commands
└── hooks/                        # Event handlers
```

This is how the [proxify-dev/Claude-Code](https://github.com/proxify-dev/Claude-Code) repo is structured — it's both a skills distribution repo and a plugin.

## Key Principles

- **SKILL.md is a router, not a monolith.** Keep it under 500 lines. Point to references.
- **Description is the trigger.** If the description doesn't match how people ask for help, the skill won't fire.
- **References are self-contained.** An agent reading just one reference file should get actionable guidance.
- **Earn complexity.** Start with a single SKILL.md. Only add references when the body gets too long.

## Deep Dive

For comprehensive skill architecture guidance, see the [skill-architecture skill](../skills/skill-architecture/SKILL.md).
