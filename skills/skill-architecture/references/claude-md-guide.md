# Writing effective CLAUDE.md files

CLAUDE.md is the highest-leverage configuration surface for Claude agents. It's injected as a user message after the system prompt — advisory, not enforced — and it survives compaction (re-injected from disk after `/compact`). Every token in it is loaded into every conversation, so the discipline is: earn every line.

## The precedence hierarchy

Claude Code walks the directory tree collecting CLAUDE.md files. More specific locations take precedence:

| Priority | Location | Scope | Loaded |
|----------|----------|-------|--------|
| 1 (highest) | `/etc/claude-code/CLAUDE.md` | Organization-wide, cannot be excluded | At launch |
| 2 | `~/.claude/CLAUDE.md` | Personal, all projects | At launch |
| 3 | `./CLAUDE.md` or `./.claude/CLAUDE.md` | Project root | At launch |
| 4 | `./CLAUDE.local.md` | Personal project overrides (gitignored) | At launch |
| 5 | Parent directory CLAUDE.md files | Inherited in monorepos | At launch |
| 6 | Subdirectory CLAUDE.md files | Module-specific | On demand |

`.claude/rules/*.md` files auto-load with the same priority as CLAUDE.md. Rules can be path-scoped via YAML `paths` frontmatter so they only load when Claude works on matching files. The `@imports` syntax (`@path/to/file`) enables inline file expansion with up to 5 hops of recursion.

## What belongs in CLAUDE.md

Target **under 200 lines**. Concise bullet-point instructions are roughly 40% more likely to be followed than long paragraphs, and frontier models can follow approximately 150–200 instructions with reasonable consistency before quality degrades uniformly. Since the system prompt already contains ~50 instructions, your actual budget is smaller than it appears.

**Include:**
- One-line project overview with tech stack
- Build/test/lint commands (Claude uses these verbatim)
- Brief architecture/directory map
- Coding conventions Claude cannot infer from existing code
- Critical warnings about gotchas
- Pointers to detailed docs using `@imports` with "Read when" triggers

**Exclude:**
- Standard language conventions Claude already knows
- Code style rules enforced by linters (use hooks instead)
- Detailed API documentation (link to it)
- File-by-file codebase descriptions (Claude can read files itself)
- Anything that changes frequently

## CLAUDE.md is for judgment; hooks are for enforcement

Use **IMPORTANT** or **YOU MUST** sparingly — if everything is marked important, nothing is. For deterministic behaviors that must always happen (formatting, linting, blocking certain writes), use hooks rather than CLAUDE.md instructions. Hooks execute as code; CLAUDE.md relies on LLM compliance.

## The pointer pattern

CLAUDE.md's job is to point, not to explain. One line per concern: state what to do and where to read more. Not why, not how. The agent needs (1) when this applies and (2) where to go. That's it.

**Good:**
```
- **AI-first UX:** Before building any creator-facing surface, run the Mode 3 gate in
  .agents/skills/product-design-thinker/SKILL.md.
```

**Bad:** A 30-line section explaining five rules, a checklist, and examples inline in CLAUDE.md. That depth belongs in a skill.

## A well-structured example

```markdown
# ShopFront
Next.js 14 e-commerce app. App Router, Stripe payments, Prisma ORM.

## Commands
- `npm run dev`: Dev server (port 3000)
- `npm run test`: Jest tests
- `npm run lint`: ESLint check
- `npm run db:migrate`: Prisma migrations

## Architecture
- `/app`: App Router pages and layouts
- `/components/ui`: Reusable UI components
- `/lib`: Utilities and shared logic
- `/prisma`: Schema and migrations

## Conventions
- TypeScript strict mode, no `any` types
- Named exports only, never default exports
- All API responses use `{ success, data, error }` shape

## Important
- NEVER commit .env files
- Stripe webhook must validate signatures
- Always run sync-pricing before production build

## Reference Documents
### API Architecture — `@docs/api-architecture.md`
**Read when:** Adding or modifying API endpoints

### Auth Flow — `@docs/authentication.md`
**Read when:** Touching auth-related code
```

Notice: no frameworks, no tables, no examples of code patterns. Those live in skills or reference docs. CLAUDE.md is the index, not the encyclopedia.
