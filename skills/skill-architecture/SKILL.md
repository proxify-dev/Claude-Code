---
name: skill-architecture
description: How to design skills that actually reach agents at the right time. Covers context efficiency (CLAUDE.md as pointer, skill as depth), distribution (where knowledge lives determines who sees it), and framing (thinking prompts over rigid rules). Use when creating, restructuring, or auditing skills — especially when a skill exists but agents aren't following it, or when deciding where new knowledge should live.
---

# Skill Architecture

How to make skills that work — not just skills that exist. The failure mode this skill prevents: you write a thorough skill, but agents never see it because it's not wired into their path.

**The core insight:** CLAUDE.md points. Skills explain. Agent definitions wire them together. Knowledge only works if it reaches the agent at decision time, and where you put it determines who sees it. The SKILL.md body loads into context on every trigger — every line here costs attention budget on every invocation. References load only when explicitly read.

## Which reference do I need?

- **Writing or editing a CLAUDE.md?** Read [claude-md-guide.md](references/claude-md-guide.md) — the precedence hierarchy, what belongs there vs. what doesn't, the 200-line budget, hooks vs. instructions, and a worked example.

- **Structuring a skill from scratch?** Read [skill-structure-guide.md](references/skill-structure-guide.md) — the three-level loading model (metadata, SKILL.md body, bundled resources), directory anatomy, modes for different moments, and when to split vs. keep things simple.

- **Deciding where knowledge should live?** Read [distribution-layers.md](references/distribution-layers.md) — the full priority hierarchy (system prompt > tool descriptions > CLAUDE.md > user messages), the decision table for routing knowledge to the right layer, and the duplication trap.

- **Writing skill instructions that agents actually follow?** Read [framing-guide.md](references/framing-guide.md) — thinking prompts over rigid rules, the right altitude, why examples beat rule lists, and recalibrating for Claude 4.x responsiveness.

- **Skill exists but agents aren't following it?** Read [auditing-checklist.md](references/auditing-checklist.md) — the four-point diagnostic (distribution, trigger description, framing, moment), eval-driven improvement, and the self-improvement feedback loop.