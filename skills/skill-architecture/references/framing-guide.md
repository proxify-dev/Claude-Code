# Writing skill instructions that agents actually follow

Skills guide agents. They don't replace agent judgment. The difference between a skill that changes behavior and one that gets ignored often comes down to framing — how the instructions are written, not what they say.

## Thinking prompts over rigid rules

A gate that asks "Is this an empty form? Could the AI generate a first draft?" lets the agent reason about its specific case. A rule that says "NEVER show empty forms" forces a pattern that may not fit.

**Ask questions, don't dictate answers.** Frame instructions as decision points the agent evaluates, not mandates it follows blindly. The agent has context about its specific situation that the skill author didn't.

**Explain why, not just what.** Agents with good theory of mind apply principles flexibly when they understand the reasoning. Agents given rigid rules follow them blindly — including into situations where they shouldn't apply.

### Before / after

**Rigid rule:**
> ALWAYS use server components. NEVER use client components for data fetching.

**Thinking prompt:**
> Before adding `"use client"`, ask: does this component need browser APIs, event handlers, or local state? If it only fetches and renders data, it's likely a better fit for a server component — the data stays on the server and the client ships less JavaScript.

The rigid version will be followed in cases where a client component is actually the right call (e.g., real-time subscriptions, optimistic updates). The thinking prompt gives the agent the principle and trusts it to apply correctly.

## The right altitude

Anthropic's guidance uses the metaphor of "right altitude" for instructions — specific enough to guide behavior effectively, yet flexible enough to provide strong heuristics rather than brittle if-else logic.

Too high: "Write good code." (No actionable guidance.)
Too low: "For every function over 20 lines, extract the first 10 lines into a helper named `prepare_{original_name}`." (Brittle, applies poorly to most cases.)
Right altitude: "When a function is doing multiple jobs, consider whether extracting a helper would make the intent clearer — but only if the extraction creates a meaningful abstraction, not just a shorter function."

## Over-prescription signals

Watch for these yellow flags when writing or reviewing skill instructions:

- **"ALWAYS" / "NEVER" / "MUST" in caps** — Could this be a question instead? Reserve caps-lock enforcement for genuine blockers (security, data loss), not design preferences.
- **"Every X must Y"** — Is that really true for every X? Or most? Universals that aren't actually universal train agents to ignore your instructions when they encounter the exceptions.
- **"mandatory", "do not proceed without"** — These suppress judgment. An agent that hits a case where proceeding is actually fine will either violate the instruction (learning to ignore you) or halt unnecessarily (wasting tokens and time).

**The test:** Would you give this instruction to a smart engineer who understands the domain? Or would you instead explain the principle and trust them to apply it? Write skills the second way.

## Format matters: bullets over prose

Concise bullet-point instructions are roughly 40% more likely to be followed than long paragraphs. When writing skill content, prefer scannable structure — short bullets, tables, before/after pairs — over dense prose. The agent needs to extract the instruction and apply it; walls of text bury the signal.

## Examples beat rule lists

3–5 curated examples wrapped in `<example>` tags are dramatically more effective than long lists of rules. Examples show rather than tell, and Claude 4.x pays extremely close attention to them.

When writing examples:
- Show the situation, the decision, and the reasoning
- Include at least one example where the "obvious" answer is wrong
- Make examples concrete — real file paths, real component names, real tradeoffs

## Recalibrating for Claude 4.x

Claude 4.x models are significantly more responsive to instructions than their predecessors. Skills written with aggressive language ("CRITICAL: You MUST use this tool") to combat undertriggering in older models may now overtrigger — causing the agent to apply the skill in situations where it shouldn't.

Dial back to normal, conversational prompting. Explain the reasoning. Trust the model to apply judgment. If you find the agent still doesn't follow an instruction after conversational framing, the issue is more likely distribution (the agent never sees the skill) or moment (the skill speaks to the wrong phase) than intensity of language.

## The spectrum of enforcement

Not all instructions need the same level of compliance:

| Need | Mechanism | Example |
|------|-----------|---------|
| Must always happen, no exceptions | Hooks (deterministic code) | Linting, formatting, blocking `.env` commits |
| Should happen unless there's a good reason | Thinking prompt in skill | "Before adding a dependency, ask: is this already available in the project?" |
| Consider doing this | Principle with reasoning | "Smaller components tend to be more reusable, but forced decomposition creates indirection" |
| Interesting context | Reference doc | Background on why the architecture was chosen |
