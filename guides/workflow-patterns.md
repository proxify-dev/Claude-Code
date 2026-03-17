# Workflow Patterns

Proven patterns for working with Claude Code on real engineering tasks. These aren't prescriptive — adapt them to your project and style.

## Plan-Then-Execute

The most reliable pattern for non-trivial work. Separates thinking from doing.

1. **Ask Claude to plan:** "I need to add user authentication. Plan the implementation — what files to change, what approach to take, what to watch out for."
2. **Review the plan:** Read it, push back, ask questions. This is where you catch wrong assumptions.
3. **Execute step by step:** "Let's start with step 1." Review each change before moving on.

**When to use:** Features that touch multiple files, refactors, anything where a wrong first step is expensive to undo.

**Tip:** Use Claude's plan mode (`/plan`) to enforce this — it prevents edits until you approve.

## TDD Loop

Let tests drive the implementation. Claude is very effective at this pattern.

1. **Write the test first:** "Write a test for a function that calculates shipping cost based on weight and destination."
2. **Run the test:** "Run the tests — it should fail."
3. **Implement:** "Now implement the function to make the test pass."
4. **Refactor:** "Clean up the implementation while keeping tests green."

**When to use:** Well-defined behavior, utility functions, API endpoints, business logic.

## Bug Fix Cycle

A structured approach to debugging with Claude.

1. **Reproduce:** "Here's the error I'm seeing: [paste error]. Help me understand what's happening."
2. **Diagnose:** Let Claude read the relevant code and trace the issue.
3. **Fix:** "Fix the root cause, not just the symptom."
4. **Verify:** "Run the tests. Add a regression test for this bug."

**When to use:** Any bug. The key is giving Claude the error output and letting it trace the cause rather than guessing.

## Refactor Cycle

Safe, incremental refactoring with a safety net.

1. **Ensure tests pass:** "Run all tests first — we need a green baseline."
2. **Describe the goal:** "I want to extract the payment logic from the order controller into its own service."
3. **Incremental changes:** Claude moves code, updates imports, adjusts tests — one logical step at a time.
4. **Verify after each step:** Tests should stay green throughout.

**When to use:** Code reorganization, extracting modules, renaming across the codebase.

## Code Review Workflow

Use Claude as a thorough reviewer before opening a PR.

1. **Ask for review:** "Review the changes in this branch compared to main. Focus on correctness, edge cases, and security."
2. **Address feedback:** Work through issues one by one.
3. **Final check:** "Any remaining concerns before I open the PR?"

**When to use:** Before every PR, especially for critical paths.

## Exploration Pattern

When you're new to a codebase or unfamiliar module.

1. **Start broad:** "Explain the architecture of this project. What are the main modules and how do they connect?"
2. **Go deep:** "How does the authentication flow work end to end?"
3. **Build context:** "What would I need to change to add OAuth support?"

**When to use:** Onboarding to a new repo, understanding unfamiliar code before making changes.

## General Tips

- **Be specific about what you want.** "Fix the bug" is worse than "The signup form throws a 500 when the email contains a plus sign."
- **Share error output.** Paste the actual error, stack trace, or unexpected behavior.
- **Review diffs, not just the outcome.** Claude may change more than necessary — check what actually changed.
- **Use `/compact` between tasks.** Frees context for the next piece of work.
- **Don't fight the agent.** If Claude is going in circles, step back and reframe the task rather than repeating the same instruction.
