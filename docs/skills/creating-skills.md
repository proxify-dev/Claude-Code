---
title: "Creating Skills"
description: "How to build your own skill: anatomy, SKILL.md format, and first steps."
sidebar_position: 3
---

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

## SKILL.md Format

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
