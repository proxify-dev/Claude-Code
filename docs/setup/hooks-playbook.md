---
title: "Hooks Playbook"
description: "Essential hooks every project should have — enforcing what CLAUDE.md can only suggest."
sidebar_position: 3
---

CLAUDE.md is advisory — Claude follows it because it's in context, but nothing enforces compliance. Hooks are code. They execute automatically on specific events and can block, modify, or extend Claude's behavior.

For the full hooks reference, see the [official docs](https://code.claude.com/docs/hooks).

## The Essential Five

### 1. Auto-lint on file write

Run your linter after every file edit so Claude sees and fixes issues immediately.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "command": "npx eslint --fix $CLAUDE_FILE_PATH 2>&1 || true"
      }
    ]
  }
}
```

**Why:** Catches style violations in real-time instead of accumulating them.

### 2. Block .env commits

Prevent Claude from ever staging sensitive files.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "command": "if echo \"$CLAUDE_TOOL_INPUT\" | grep -qE 'git add.*\\.env'; then echo 'BLOCKED: Never commit .env files' >&2; exit 1; fi"
      }
    ]
  }
}
```

**Why:** CLAUDE.md says "don't commit .env" — this makes it impossible.

### 3. Run tests after code changes

Automatically run your test suite after implementation changes.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "command": "if echo \"$CLAUDE_FILE_PATH\" | grep -qE '\\.(ts|tsx|js|jsx)$'; then npm test --silent 2>&1 | tail -5; fi"
      }
    ]
  }
}
```

**Why:** Claude gets immediate test feedback and can self-correct without you intervening.

### 4. Guard config files

Require confirmation before Claude edits sensitive configuration.

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Write|Edit",
        "command": "if echo \"$CLAUDE_FILE_PATH\" | grep -qE '(package\\.json|tsconfig|docker-compose|\\.github/)'; then echo 'WARNING: Editing config file — review carefully' >&2; fi"
      }
    ]
  }
}
```

**Why:** Not all files are equal. Config changes have outsized blast radius.

### 5. Auto-format on save

Run Prettier (or your formatter) after every write.

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "command": "npx prettier --write $CLAUDE_FILE_PATH 2>/dev/null || true"
      }
    ]
  }
}
```

**Why:** Keeps diffs clean and prevents style nits in code review.

## Where to Configure

Hooks go in your settings files:

| File | Scope |
|------|-------|
| `.claude/settings.json` | Team-shared (commit to git) |
| `.claude/settings.local.json` | Personal (gitignored) |
| `~/.claude/settings.json` | All your projects |

Team hooks (linting, test runs, security blocks) go in `.claude/settings.json`. Personal preferences go in local or user settings.

## Hook Design Principles

- **Fast hooks only.** Hooks run synchronously — a slow hook slows every action. Keep them under 2 seconds.
- **Fail open for warnings, fail closed for security.** Lint warnings shouldn't block work. `.env` protection must.
- **Use `|| true` for non-critical hooks.** A crashing linter shouldn't halt Claude's workflow.
- **Test your hooks manually first.** Run the command yourself before adding it as a hook.
