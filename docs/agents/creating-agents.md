---
title: "Creating Agents"
description: "How to create agents: frontmatter fields, system prompt design, model selection, and MCP configuration."
sidebar_position: 2
---

:::tip[Official reference]
For how sub-agents work in Claude Code, see the [official sub-agents docs](https://code.claude.com/docs/en/sub-agents).
:::

## File Location

Place agent files in the `agents/` directory of your plugin:

```
my-plugin/
└── agents/
    ├── code-reviewer.md
    ├── test-generator.md
    └── docs-writer.md
```

All `.md` files in `agents/` are auto-discovered.

## Frontmatter Fields

```yaml
---
name: code-reviewer          # Required. Lowercase, hyphens, 3-50 chars.
description: Use this agent when...  # Required. Triggering conditions + examples.
model: inherit               # Required. inherit | sonnet | opus | haiku
color: blue                  # Required. blue | cyan | green | yellow | magenta | red
tools: ["Read", "Grep"]      # Optional. Restricts available tools.
mcpServers:                   # Optional. MCP server access.
  - github
---
```

### name

Identifier for the agent. Lowercase letters, numbers, and hyphens only. Must start and end with alphanumeric.

### description

The most critical field — determines when Claude triggers this agent. Must include triggering conditions and `<example>` blocks:

```
Use this agent when [conditions]. Examples:

<example>
Context: [Scenario]
user: "[What user says]"
assistant: "[How Claude responds]"
<commentary>
[Why this agent is appropriate]
</commentary>
</example>
```

Include 2-4 examples covering different phrasings and proactive/reactive triggering.

### model

- `inherit` — use the parent's model (recommended default)
- `sonnet` — balanced speed and capability
- `opus` — most capable, use for complex analysis
- `haiku` — fast and cheap, use for simple tasks

### color

Visual identifier in the UI. Choose distinct colors for different agent types:
- **Blue/Cyan** — analysis, review
- **Green** — generation, creation
- **Yellow** — validation, caution
- **Red** — security, critical
- **Magenta** — creative, transformation

### tools

Restricts which tools the agent can use. Omit for full access.

Common sets:
- Read-only: `["Read", "Grep", "Glob"]`
- Code generation: `["Read", "Write", "Grep"]`
- Testing: `["Read", "Bash", "Grep"]`

### mcpServers

Two forms:

**Inline** (scoped to subagent — spins up fresh, main context never sees it):
```yaml
mcpServers:
  - playwright:
      type: stdio
      command: npx
      args: ["-y", "@playwright/mcp@latest"]
```

**String reference** (reuses parent session's connection):
```yaml
mcpServers:
  - github
```

## System Prompt

The markdown body after the frontmatter becomes the agent's system prompt. Write in second person.

### Template

```markdown
You are [role] specializing in [domain].

**Your Core Responsibilities:**
1. [Primary responsibility]
2. [Secondary responsibility]

**Process:**
1. [Step one]
2. [Step two]
3. [Step three]

**Output Format:**
- [What to include]
- [How to structure]

**Edge Cases:**
- [Edge case 1]: [How to handle]
```

### Tips

- Be specific about responsibilities — avoid generic instructions
- Define a clear step-by-step process
- Specify the output format so results are consistent
- Address edge cases the agent might encounter
- Keep under 10,000 characters

## Deep Dive

For comprehensive agent development guidance including validation rules, testing strategies, and the AI-assisted generation prompt, install the [agent-development skill](../../skills/agent-development/SKILL.md):

```bash
npx skills add proxify-dev/Claude-Code@agent-development
```
