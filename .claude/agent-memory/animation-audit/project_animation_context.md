---
name: Animation audit — docs site context
description: Tech stack, existing animation infrastructure, and key constraints for docs site animation work
type: project
---

The docs site is Mintlify (MDX). One custom animation component exists: `docs/snippets/ScrollVideo.jsx` — intersection-observer-triggered video player, supports `loop` prop, inverts colors in light mode. Used 4x on `patterns/distribution.mdx` for `.webm` explainer videos.

Zero CSS animations exist anywhere else in the site. No Framer Motion, GSAP, or Lottie.

**Why:** The site is content-only MDX — no build pipeline for custom CSS. Animations must be implemented as JSX snippets (like `ScrollVideo`) dropped into `.mdx` files, or via `.webm` video files served from `docs/public/videos/`.

**How to apply:** Any new animation recommendation must either (a) follow the ScrollVideo pattern — JSX component in `docs/snippets/`, imported into the MDX page, or (b) use Mintlify's built-in Steps/CardGroup/Tabs components which have their own subtle built-in transitions. Do not recommend CSS-only approaches unless Mintlify's custom CSS config is confirmed available.

Key content types on the site:
- Maturity Ladder — 4-step progression (`patterns/maturity-ladder.mdx`) — uses `<Steps>` already
- Orchestration Patterns — 5-pattern decision matrix (`patterns/orchestration-patterns.mdx`)
- Fan-Out/Fan-In, Pipeline Chains, Contract Chains — spatial/flow explanations (`patterns/orchestration-patterns/`)
- Self-Improving Loop — feedback cycle table (`patterns/self-improving-loop.mdx`)
- System Evolution — flywheel diagram in a code block (`patterns/system-evolution.mdx`)
- Parallel Execution — cascade workflow and sessions table (`patterns/parallel-execution.mdx`)
- Context Management — context window budget mental model (`patterns/context-management.mdx`)
- Distribution — already has 4x ScrollVideo animations (`patterns/distribution.mdx`)
- Onboarding Checklist — static checkbox list (`reference/onboarding-checklist.mdx`)
- Dojo — coming-soon placeholder (`dojo/index.mdx`)
