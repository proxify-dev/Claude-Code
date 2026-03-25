# Accessibility

Animation can cause motion sickness, distraction, and seizures. Respecting user preferences isn't optional — it's the difference between an inclusive product and one that literally makes people ill.

## prefers-reduced-motion

Always check and respect it. But "reduced" doesn't mean "none" — users who set this preference still benefit from state changes being communicated visually. Replace spatial motion with opacity fades:

```css
.element {
  animation: slide-in 220ms cubic-bezier(0.22, 1, 0.36, 1);
}

@media (prefers-reduced-motion: reduce) {
  .element {
    animation: fade-in 220ms ease; /* Gentler alternative, not no animation */
  }
}
```

**Key principle:** disable `transform`-based motion; keep `opacity` transitions. A fade still communicates "something appeared" without triggering vestibular discomfort.

## Framer Motion hook

```tsx
import { useReducedMotion } from "framer-motion";

function Panel() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
      transition={reduceMotion ? { duration: 0 } : { duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
```

## Hover-only transitions

Touch devices don't have hover states. Protect hover transitions behind a media query so they don't fire on tap:

```css
@media (hover: hover) and (pointer: fine) {
  .link {
    transition: color 200ms ease, opacity 200ms ease;
  }
  .link:hover {
    opacity: 0.8;
  }
}
```

## What to validate

When reviewing animation code, check:
1. Does it degrade gracefully with `prefers-reduced-motion: reduce`?
2. Are hover effects gated behind `@media (hover: hover)`?
3. Are looping animations pausable (off-screen or via user control)?
4. Is `will-change` toggled only during animation, not set permanently?
5. Are there any `width`/`height`/`top`/`left` animations? (There shouldn't be.)
