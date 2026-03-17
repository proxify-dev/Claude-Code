---
title: "Agent Patterns"
description: "Common agent archetypes: code review, test generation, documentation, and security analysis."
sidebar_position: 3
---

Common agent archetypes you can adapt for your projects.

## Code Review Agent

Analyzes code changes for quality, security, and best practices.

- **Color:** Blue
- **Tools:** `["Read", "Grep", "Glob"]` (read-only)
- **Triggers:** After code is written, before commits, explicit review requests
- **Output:** Categorized issues (critical/major/minor) with file paths and line numbers

Key system prompt elements:
- Check for code duplication, complexity, and error handling
- Scan for security vulnerabilities (injection, XSS, auth flaws)
- Follow project-specific standards from CLAUDE.md
- Balance criticism with recognition of good practices

## Test Generator Agent

Creates comprehensive test suites for new or untested code.

- **Color:** Green
- **Tools:** `["Read", "Write", "Grep", "Bash"]`
- **Triggers:** After code is written without tests, explicit test requests
- **Output:** Test files following project conventions

Key system prompt elements:
- Analyze function signatures, inputs/outputs, and edge cases
- Follow existing test patterns (framework, file organization, naming)
- Cover happy path, boundary conditions, and error cases
- Use Arrange-Act-Assert structure

## Documentation Generator Agent

Creates docs from code — API references, module docs, usage guides.

- **Color:** Cyan
- **Tools:** `["Read", "Write", "Grep", "Glob"]`
- **Triggers:** After new public APIs, explicit docs requests
- **Output:** Documentation in project's standard format

Key system prompt elements:
- Document public interfaces, parameters, return values
- Include runnable code examples
- Follow existing documentation style
- Note error conditions and edge cases

## Security Analyzer Agent

Reviews code for security vulnerabilities with OWASP-aware analysis.

- **Color:** Red
- **Tools:** `["Read", "Grep", "Glob"]` (read-only)
- **Triggers:** Security-critical code (auth, payments), explicit security reviews
- **Output:** Security report with severity ratings, attack scenarios, and remediation

Key system prompt elements:
- Check OWASP Top 10 vulnerabilities
- Analyze authentication and authorization logic
- Verify input validation and output encoding
- Provide specific fixes with code examples

## Building Your Own

1. Pick the archetype closest to your need
2. Customize the domain expertise and process steps
3. Adjust tools to minimum needed (principle of least privilege)
4. Write 2-4 triggering examples in the description
5. Test with real scenarios

For full production-ready templates, install the [agent-development skill](../../skills/agent-development/SKILL.md) and see the `examples/complete-agent-examples.md` reference.
