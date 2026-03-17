# Effective Prompting

Patterns that work well when communicating with Claude Code.

## Be Specific

**Vague:** "Fix the login."
**Specific:** "The login form returns a 500 when the email contains a `+` sign. The error is in `src/auth/login.ts`. Here's the stack trace: ..."

The more context you give, the faster Claude gets to the right solution.

## Share Error Output

Always paste the actual error — don't describe it from memory. Include:
- The full error message or stack trace
- The command that triggered it
- What you expected to happen

Claude reads error messages more carefully than you do. Let it.

## Ask for a Plan First

For anything non-trivial, ask Claude to plan before implementing:

"I need to add rate limiting to our API. Plan the approach — what middleware to use, where to add it, what limits to set. Don't implement yet."

Review the plan, push back on anything you disagree with, then approve execution.

## Constrain the Scope

Tell Claude what NOT to do:

"Add input validation to the signup form. Only validate the email and password fields — don't touch the rest of the form or add any new dependencies."

This prevents scope creep and unnecessary changes.

## Use Examples

When explaining a pattern you want followed:

"Here's how we handle errors in this project: [paste example]. Follow the same pattern for the new endpoint."

Claude follows examples better than abstract rules.

## Iterate, Don't Repeat

If Claude's first attempt isn't right, don't repeat the same instruction louder. Instead:

- Explain what's wrong with the current output
- Be more specific about what you want
- Provide an example of the correct output
- Try a different framing

"That's not right" is less useful than "The function should return `null` instead of throwing when the user isn't found — we handle missing users in the caller."

## The "Explain Then Ask" Pattern

When the task requires domain knowledge Claude might not have:

"Our billing system works like this: [brief explanation]. Given that context, how should we handle prorated refunds?"

Front-loading context saves back-and-forth.

## When to Start Fresh

Sometimes a conversation goes off track and no amount of correction helps. Signs:
- Claude keeps circling back to the same wrong approach
- The context is polluted with many failed attempts
- You've significantly changed what you want

In these cases, `/compact` or start a new session with a fresh, clear prompt.
