# Auditing skills that aren't working

When a skill exists but agents aren't following it, the problem falls into one of four categories. Work through them in order — distribution issues are the most common and the cheapest to fix.

## The four-point diagnostic

### 1. Check distribution

Is the skill referenced from CLAUDE.md or the implementation workflow? If not, agents during implementation will never see it.

Questions to ask:
- Does CLAUDE.md contain a pointer to this skill with a clear "when to read" trigger?
- For domain-specific skills, does the relevant agent definition reference it?
- Is the skill in a location agents can discover (`.claude/skills/`, `.agents/skills/`, or `~/.claude/skills/`)?

The most common failure: the skill exists, contains good guidance, but no agent ever reads it because nothing in their path points to it.

### 2. Check the trigger description

The YAML `description` field in frontmatter is the primary mechanism that determines whether an agent consults a skill. If it's too narrow, the skill sits unused. If it's too broad, it fires on irrelevant conversations and trains agents to ignore it.

Questions to ask:
- Does the description cover the range of phrasings a user might use? ("add auth", "implement login", "secure the API" should all trigger an auth skill)
- Does it include negative signals? ("Not for API key rotation" helps agents skip it when it doesn't apply)
- Is it substantive enough? Simple one-step queries won't trigger skills regardless of description quality — agents handle those directly. The description should target multi-step, specialized work.

### 3. Check framing

Is the skill so prescriptive that agents route around it? Or so vague that it doesn't change behavior?

Signs of over-prescription:
- Multiple ALWAYS/NEVER/MUST in caps
- Long checklists where every item is "mandatory"
- Instructions that don't explain why

Signs of under-specification:
- Generic advice that could apply to anything ("write clean code")
- No examples or worked scenarios
- No decision points — just principles without application

See [framing-guide.md](framing-guide.md) for how to rewrite instructions that fall into either trap.

### 4. Check the moment

Does the skill speak to the moment the agent needs it? A brainstorming framework doesn't help during component implementation. A detailed coding checklist doesn't help during product discovery.

Questions to ask:
- What is the agent doing when it needs this guidance? (Planning? Writing code? Reviewing?)
- Does the skill's content match that activity? Or does the agent have to mentally translate?
- If the skill covers multiple moments, are they separated into modes or references so the agent can skip to the relevant one?

## Eval-driven improvement

When a skill is underperforming, don't guess at improvements — measure.

### Start with 20 test cases

Anthropic advocates eval-driven development: build evaluations to define planned capabilities before the agent can fulfill them, then iterate. Start with just 20 test cases that represent realistic prompts where the skill should (or shouldn't) activate and change behavior.

### Three grader types

| Type | Speed | Cost | Best for |
|------|-------|------|----------|
| **Code-based** | Fast | Cheap | Deterministic checks: did the output contain X? Did the file compile? |
| **Model-based** | Medium | Medium | Nuanced assessment: was the reasoning sound? Did it follow the principle? |
| **Human** | Slow | Expensive | Gold standard: catching what automation misses, especially for subjective quality |

Use code-based graders for the obvious stuff, model-based for the subtle stuff, and human review for the cases that matter most. Capability evals with high pass rates graduate to regression suites that prevent backsliding.

## The self-improvement feedback loop

When agents make mistakes, the transcript contains the diagnosis. Look at it from the agent's perspective:

| Symptom | Likely cause | Fix |
|---------|-------------|-----|
| Agent misunderstands the task | Skill instructions are ambiguous | Rewrite with concrete examples |
| Agent tries but fails repeatedly | Missing tools or wrong tool guidance | Add scripts to `scripts/`, improve tool descriptions |
| Agent ignores the skill entirely | Distribution or trigger problem | Add CLAUDE.md pointer, broaden description |
| Agent follows skill but produces bad output | Skill teaches the wrong thing | Revise the skill's approach, not just its wording |
| Agent over-applies the skill | Description too broad, or aggressive framing | Narrow the trigger, dial back to conversational tone |

Claude 4 models are excellent prompt engineers. Having Claude rewrite tool descriptions based on observed failures has been shown to yield a 40% decrease in task completion time. The same principle applies to skills: use failures to improve the skill, not just to retry the task.

## When to give up on a skill

Sometimes the right answer is that the skill shouldn't exist:

- If the guidance is so generic it applies to everything, it's not a skill — it's a principle that belongs in CLAUDE.md or the system prompt
- If the guidance is so specific it applies to one task, it's not a skill — it's a one-time instruction that belongs in the user message
- If agents consistently produce better results without the skill, the skill is adding noise, not signal. Remove it.
