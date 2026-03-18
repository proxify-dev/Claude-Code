---
title: "Composing a Skills Stack"
description: "How to discover, install, and compose skills into a layered knowledge system for your project."
sidebar_position: 2
---

Skills are reusable knowledge packages that load on demand. A skills stack is the set you install for a project — chosen to match your tech stack and workflow.

## The Layered System

Your Claude Code knowledge lives in layers:

| Layer | Purpose | Example |
|-------|---------|---------|
| CLAUDE.md | Project-specific context | "We use Prisma, run `npm test` for tests" |
| Skills | Domain patterns | How to write Zod schemas, Tailwind conventions |
| References | Deep docs | Full API guides, architecture specs |

CLAUDE.md tells Claude *about your project*. Skills teach Claude *how to work in your domain*. Together they replace the need to explain things every session.

## Starter Stacks

Pick the stack that matches your project, then add domain skills on top.

### React / Next.js Frontend
```bash
npx skills add proxify-dev/Claude-Code@skill-architecture
npx skills add proxify-dev/Claude-Code@agent-development
# Community skills for your stack:
npx skills search nextjs
npx skills search tailwind
npx skills search react-query
```

### Node.js API
```bash
npx skills add proxify-dev/Claude-Code@skill-architecture
npx skills search zod
npx skills search postgres
```

### Fullstack
Combine both. Skills don't conflict — they load only when triggered by relevant tasks.

## Discovering Skills

```bash
# Search by keyword
npx skills search <keyword>

# Browse the community directory
# https://skills.sh

# Install from any public GitHub repo
npx skills add owner/repo@skill-name
```

## Composing Skills That Work Together

Skills are independent by design — each triggers on its own conditions. But some combinations are particularly effective:

- **skill-architecture + any domain skill** — Teaches Claude how skills work, so it uses domain skills more effectively
- **Testing skill + framework skill** — Test patterns that match your framework conventions
- **Validation skill (Zod) + API skill** — Input validation patterns that align with your API layer

## When to Create Your Own

Install existing skills when:
- A community skill covers your need
- The patterns are standard (React, Tailwind, etc.)

Create your own when:
- Your team has specific conventions not covered elsewhere
- You have internal libraries or frameworks
- You want to encode institutional knowledge (how *your team* does auth, deploys, etc.)

See [Creating Skills](../skills/creating-skills.md) for how to build one.
