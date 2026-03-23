# Directory Structure and Navigation

Where files go, how navigation works, and file conventions for the docs site.

## Directory Map

| Directory | Contains | Examples |
|-----------|----------|----------|
| `setup/` | Tool and config setup guides | `claude-md.mdx`, `hooks-playbook.mdx`, `skills-stack.mdx` |
| `patterns/` | Workflow and mindset docs | `agentic-engineering.mdx`, `workflow-patterns.mdx`, `distribution.mdx` |
| `skills/` | Skills ecosystem docs | `overview.mdx`, `creating-skills.mdx` |
| `agents/` | Agent ecosystem docs | `creating-agents.mdx` |
| `reference/` | Checklists, pitfalls, links | `onboarding-checklist.mdx`, `common-pitfalls.mdx` |

## Frontmatter

Every doc file requires `title` and `description`:

```yaml
---
title: "Clear, Descriptive Title"
description: "One-line summary for SEO and navigation."
---
```

**`sidebar_position` is NOT used.** Page ordering is controlled by the order of entries in `docs.json`.

## Tab Structure

Navigation in `docs.json` uses tabs to segment by audience and intent:

| Tab | Purpose | Contains |
|-----|---------|----------|
| **Quickstart** | Entry point, get set up | `setup/` pages + `reference/` quick lookups |
| **Mindset** | Philosophy and mental models | `patterns/agentic-engineering`, `maturity-ladder`, `distribution` |
| **Playbook** | Daily workflow and advanced patterns | `patterns/workflow-patterns`, `context-management`, `parallel-execution`, etc. |
| **Skills & Agents** | Knowledge architecture | `skills/` and `agents/` pages |

When creating a new page, add it to the correct tab and group in `docs.json` or it won't appear in the sidebar.

## File Conventions

- **Extension:** `.mdx` (required by Mintlify)
- **Naming:** lowercase, hyphens — `hooks-playbook.mdx`, not `HooksPlaybook.mdx`
- **Internal links:** relative paths — `../setup/claude-md/`, not `/setup/claude-md`
- **Images:** store in `docs/images/`, reference as `/images/example.png`

## Bottom-of-File Navigation

Docs use explicit prev/next links at the bottom of each file:

```
**← Prev:** [Title](relative-path/) · **Next:** [Title →](relative-path/)
```

When adding or reordering pages, update these links on the affected pages and their neighbors.
