---
name: ui-animation
description: Gold-standard animation craft for web interfaces. Use when writing, reviewing, or implementing any motion — CSS transitions, keyframes, Framer Motion, spring animations, easing, timing, gestures, toasts, drawers, reduced-motion, or any UI that moves. Triggers on tasks involving transitions, hover effects, enter/exit animations, scroll reveals, drag interactions, or motion design.
---

# UI Animation Craft

Tasty animation comes from three things: the right easing curve, the right duration, and the discipline to animate only what matters. Most "meh" animations fail on one of these.

## Before you animate

Ask these questions — they prevent 90% of animation mistakes:

- **Does this animation have a purpose?** Valid purposes: feedback, orientation, attention, continuity. If you can't name one, don't animate.
- **How often will the user see this?** Onboarding: go expressive. Daily action: keep it subtle and fast. Constant action (tab switching, list scrolling): skip animation entirely. Delight on first use becomes annoyance on the hundredth.
- **Is this a keyboard-initiated action?** Arrow keys, tab/focus, shortcuts — never animate these. Only pointer and touch interactions get motion.
- **Is this entering, moving, or exiting?** The answer determines your easing curve (see below).

## Golden values

These are the specific numbers that separate "good enough" from "tasty":

| What | Value | Why |
|------|-------|-----|
| Default easing | `cubic-bezier(0.22, 1, 0.36, 1)` | Energetic ease-out — starts fast, settles smooth |
| Move easing | `cubic-bezier(0.25, 1, 0.5, 1)` | Slightly softer for lateral/spatial movement |
| iOS drawer easing | `cubic-bezier(0.32, 0.72, 0, 1)` | The premium sheet/drawer feel |
| Simple hover | `200ms ease` | Color, background, opacity changes only |
| UI feedback | `150–250ms` | Buttons, toggles, micro-interactions |
| Larger transitions | `250–400ms` | Modals, page transitions, context switches |
| Drawer duration | `~500ms` | Drawers need room to breathe |
| Max UI duration | `300ms` | Anything longer feels disconnected (except drawers/marketing) |
| Button press scale | `scale(0.97)` | Subtle tactile feedback |
| Min enter scale | `scale(0.85–0.95)` | Never animate from `scale(0)` — it looks broken |
| Stagger delay | `30–50ms` | Between siblings in a list reveal |
| Toast stack offset | `14px` per toast | With `scale(1 - index * 0.05)` for depth |

## What to animate — and what not to

- Animate only `transform` and `opacity`. These are GPU-composited and won't trigger layout.
- For simple state feedback (hover color, background), `color`/`background-color`/`opacity` transitions are fine.
- Never `transition: all`. Never animate `width`, `height`, `top`, `left`.
- Use `clip-path` for layout-free reveals (tabs, progress bars) — it's composited and performant.

## Which reference do I need?

| I'm working on... | Read |
|---|---|
| Choosing easing curves, custom beziers, springs | [easing.md](references/easing.md) |
| Duration, delays, asymmetric timing | [timing.md](references/timing.md) |
| Scale, translate, origin, 3D transforms | [transforms.md](references/transforms.md) |
| Drag, swipe, snap points, gestures | [interactions.md](references/interactions.md) |
| will-change, hardware acceleration, pausing | [performance.md](references/performance.md) |
| Reduced motion, hover guards, touch devices | [accessibility.md](references/accessibility.md) |
| Toasts, drawers, tabs, staggers, scroll-reveal | [recipes.md](references/recipes.md) |
