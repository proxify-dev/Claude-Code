# Provenance Protocol

How to record which reference files informed a docs page. This is a mandatory part of writing or editing any `.mdx` page.

## When This Applies

**Every time** you create or edit a docs page. No exceptions. If you're touching the frontmatter, check the sources.

## The Two Places Provenance Lives

1. **Frontmatter `sources:` array** — in the `.mdx` file itself (compact, visible when editing)
2. **Central index** — at `docs/.provenance/index.json` (queryable, carries detail)

Both must be updated together.

## Step 1: Add `sources:` to Frontmatter

Add a `sources:` array after `title` and `description`. Paths are relative to `references/` (drop the prefix). Order by significance — primary sources first.

```yaml
---
title: "Context Management"
description: "How to keep Claude Code effective across long sessions."
sources:
  - claude-code-tips/content/boris-claude-code-tips.md
  - claude-code-ultimate-guide/guide/core/context-engineering.md
---
```

**If docs-researcher findings are in context:** extract the paths from `**Source:**` lines in the findings. Strip the `references/` prefix.

**If no researcher was used (original content):** set `sources: []` — this distinguishes "no sources" from "not yet tracked."

**If editing an existing page:** read the current `sources:` array first. Merge new sources in — don't overwrite existing ones.

## Step 2: Update the Provenance Index

Read `docs/.provenance/index.json`, add or update the entry for this page, write it back.

The page key is the path relative to `docs/` without the `.mdx` extension (e.g., `patterns/context-management`).

```json
{
  "patterns/context-management": {
    "sources": [
      {
        "ref": "claude-code-tips/content/boris-claude-code-tips.md",
        "sections": ["Tip 5", "Tip 8"],
        "quality": "high",
        "usage": "primary",
        "notes": "Token budget mental model originated here"
      }
    ],
    "confidence": "verified",
    "last_audited": "2026-03-25"
  }
}
```

### Index fields

| Field | Required | Values | Notes |
|-------|----------|--------|-------|
| `ref` | yes | path relative to `references/` | Same as frontmatter entry |
| `sections` | no | string array | Specific sections/tips within the reference |
| `quality` | no | high / medium / low | Matches docs-researcher quality rating |
| `usage` | no | primary / supporting / minor | How heavily this source informed the page |
| `notes` | no | string | What this source contributed |
| `confidence` | yes | verified / inferred / unaudited | Set `verified` when sources are known; `inferred` when guessed by audit |
| `last_audited` | yes | ISO date | Today's date |

### Merge rules

- **Read first, then merge.** Never overwrite the entire index — other pages' entries must be preserved.
- **Adding sources to an existing page entry:** append new sources to the array, don't duplicate existing `ref` paths.
- **Updating an existing source:** replace the matching `ref` entry in-place.
- **Always update `last_audited`** to today's date when touching a page's entry.

## Quick Checklist

Before finishing a docs page, confirm:

- [ ] `sources:` array exists in frontmatter (even if empty)
- [ ] Paths are relative to `references/` (no `references/` prefix)
- [ ] `docs/.provenance/index.json` has a matching entry
- [ ] `confidence` is set (`verified` if you know the sources, `unaudited` if unsure)
- [ ] `last_audited` is today's date
