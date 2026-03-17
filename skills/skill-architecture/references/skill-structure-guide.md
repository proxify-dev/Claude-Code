# Structuring skills for token efficiency

A skill's structure directly determines its token cost profile. Anthropic's research shows token usage alone explains 80% of performance variance in agent systems — this isn't just about cost, it's about output quality. The SKILL.md body loads into context every time the skill triggers. References load only when the agent explicitly reads them. This asymmetry is the entire basis for how to organize a skill.

## The three-level loading model

| Level | What | When loaded | Token budget |
|-------|------|-------------|-------------|
| **Metadata** | Name + description (YAML frontmatter) | Always in context (skill registry) | ~100 words |
| **SKILL.md body** | Entry point, routing, core principles | Every time the skill triggers | <500 lines ideal |
| **Bundled resources** | Deep references, scripts, assets | Only when explicitly read | Unlimited |

The metadata description is the trigger mechanism — it determines whether the skill fires at all. The body should route agents to the right reference, not contain the reference itself. Resources are the depth layer where you can be thorough without paying per-invocation token costs.

## Directory anatomy

```
skill-name/
├── SKILL.md              (required — router + core principle)
├── references/           (operational docs agents read during execution)
│   ├── topic-a.md
│   └── topic-b.md
├── scripts/              (executable code for deterministic/repetitive tasks)
│   └── helper.py
└── assets/               (files used in output — templates, icons, fonts)
    └── template.html
```

Everything in `references/` should be an operational doc that agents read during execution. The SKILL.md router sends agents here. These files need to be self-contained — an agent reading just that file should get actionable guidance without needing the SKILL.md context. Don't put background reading or research in `references/`; an agent following a router link should always land on something directly useful for its current task.

## SKILL.md as router

When a skill covers multiple concerns, the SKILL.md body should be a routing table, not a monolith. The pattern (modeled after well-structured skills like `use-shadcn`):

1. State the one core insight in 2-3 sentences
2. List scenarios with links to the right reference file
3. Include any context an agent needs to pick the right path

The agent reads ~30 lines, identifies its scenario, opens one reference. Compare this to a 200-line SKILL.md where the agent loads everything and ignores 80% of it.

Start with the simplest structure that works. Don't create five references when one would do. A single well-organized reference beats a fragmented set of tiny files that each require a routing decision. Complexity in skill structure should be earned by demonstrated need — if agents are loading irrelevant content or struggling to find the right section, that's the signal to split.

## Modes for different moments

A skill used during brainstorming needs different content than the same skill used during implementation. Name the modes explicitly:

- "Mode 1: Brainstorm" — exploratory, generative, expands the problem space
- "Mode 2: Audit" — evaluative, applies criteria to existing work
- "Mode 3: Implementation gate" — fast check before writing code

Each mode can live in the SKILL.md body (if it's a brief gate) or in its own reference (if it's a full workflow). The key: an agent should never have to scan past irrelevant modes to find the one that applies.

## Domain organization

When a skill supports multiple domains or frameworks, organize references by variant:

```
cloud-deploy/
├── SKILL.md (workflow + selection logic)
└── references/
    ├── aws.md
    ├── gcp.md
    └── azure.md
```

The agent reads only the relevant reference file. This is the same principle as three-level loading applied within the reference layer: don't force an agent working with AWS to load GCP and Azure context.

## Self-containment

Each reference file should be independently useful. An agent reading `references/aws.md` without having read the SKILL.md body should still be able to apply the guidance. CLAUDE.md gets agents to the skill; the skill routes them to a reference; the reference does the work. If any link in that chain requires backtracking to a previous level for essential context, the structure is leaking.
