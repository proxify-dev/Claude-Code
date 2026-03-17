# Distributing knowledge across instruction layers

When Claude processes a request, it encounters instructions from multiple sources in a priority hierarchy. Each layer serves a distinct purpose. Duplication across layers wastes the model's limited attention budget — and worse, copies drift apart over time.

## The priority hierarchy

| Priority | Layer | Injected as | Reach |
|----------|-------|-------------|-------|
| 1 (highest) | **System prompt** | System message | Every turn, cannot be overridden |
| 2 | **Tool descriptions** | Injected into system prompt area | Every turn tools are available |
| 3 | **CLAUDE.md / skills** | User context | Every conversation (CLAUDE.md) or on trigger (skills) |
| 4 (lowest) | **User messages** | User message | Single turn |

LLMs bias toward instructions at the peripheries of the prompt (beginning and end). Structure accordingly: put the most critical instructions at the beginning of each section, reinforce key constraints near the end.

## What belongs where

**System prompts** — Constitutional rules that must never be overridden:
- Identity and role definition
- Global behavioral guidelines
- Output format specifications
- Action disposition (`<default_to_action>` vs `<do_not_act_before_instructions>`)
- Parallel tool use instructions
- Safety constraints
- 3–5 curated examples (dramatically more effective than rule lists)

**Tool descriptions** — Everything specific to that tool, self-contained:
- What the tool does, when to use it and when not to
- Parameter semantics and format requirements
- Edge cases and limitations
- Boundaries from similar tools
- Efficient usage patterns (e.g., "use filters to narrow results instead of broad searches")

Tool descriptions are the highest per-token leverage point. Small refinements yield large behavioral shifts.

**CLAUDE.md** — Project-specific onboarding context:
- Tech stack, build commands, architecture
- Universally applicable conventions
- Pointers to detailed documentation
- Under 200 lines; every line must earn its place

The test: if removing an instruction wouldn't cause Claude to make mistakes, cut it.

**Skills** — Deep knowledge loaded on demand:
- Frameworks, checklists, worked examples
- Domain-specific workflows
- Multi-step processes that don't apply to every conversation

**User messages** — Dynamic, per-interaction:
- Specific task requests
- Context that changes per interaction
- Task-specific overrides within the framework set by higher layers

## The decision table

When you learn something that should persist, pick the right vehicle:

| Signal | Vehicle | Why |
|--------|---------|-----|
| Every agent needs to know, every time | CLAUDE.md (one line + pointer) | Always in context |
| Only relevant to one domain (DB, AI pipeline, UI) | Agent definition or domain skill | Loaded only when relevant |
| Deep framework with examples and checklists | Skill with `references/` subdirectory | Router loaded on trigger, depth loaded on demand |
| Correction to agent behavior | Feedback memory + skill update | Memory reminds you; skill teaches future agents |
| Project-specific context that changes | Project memory | Doesn't pollute skills with ephemeral state |
| Deterministic enforcement (formatting, linting) | Hooks | Executes as code, not subject to LLM compliance |

## The duplication trap

If a principle lives in a skill, CLAUDE.md points to it — don't restate it. The failure mode: you write the same rule in CLAUDE.md and in a skill. Six months later, you update the skill but forget CLAUDE.md. Now the agent sees two conflicting instructions and has to guess which one is current.

The guiding principle is separation of concerns. Each instruction lives in exactly one layer. Tool-specific behavior goes in tool descriptions. Global behavior goes in system prompts. Project context goes in CLAUDE.md. Deep knowledge goes in skills. Pointers connect the layers; copies break them.
