# Interaction Patterns

Gesture-based interactions (drag, swipe, snap) need special animation treatment. The key principle: the user should feel like they're directly manipulating the element, not triggering a canned animation.

## Interruptibility

Animations must be interruptible. If a user opens a sidebar and immediately closes it, the close should start from wherever the open animation currently is — not wait for it to finish.

**CSS transitions are naturally interruptible** — changing the target value mid-transition retargets smoothly. This is why transitions are usually better than keyframe animations for interactive elements:

```css
/* Transitions retarget smoothly */
.sidebar {
  transform: translateX(-100%);
  transition: transform 300ms cubic-bezier(0.22, 1, 0.36, 1);
}
.sidebar.open { transform: translateX(0); }

/* Keyframes can't be interrupted mid-way */
.sidebar { animation: slideIn 300ms ease-out; }  /* avoid for interactive elements */
```

Framer Motion also handles interruption natively — `animate` prop changes retarget in-flight animations.

## Momentum-based dismissal

When users swipe to dismiss (toasts, cards, drawers), consider both distance and velocity. A fast flick should dismiss even if it hasn't traveled far:

```ts
// Velocity threshold for dismissal
const VELOCITY_THRESHOLD = 0.11; // px/ms

function shouldDismiss(distance: number, velocity: number) {
  return Math.abs(distance) > DISMISS_DISTANCE || Math.abs(velocity) > VELOCITY_THRESHOLD;
}
```

## Drag damping at boundaries

When a user drags beyond the intended range, apply damping — the element should resist like a rubber band, not stop dead:

```ts
function dampedValue(value: number, max: number): number {
  if (value <= max) return value;
  // Logarithmic damping past the boundary
  return max + Math.log(1 + (value - max) * 0.1) * 20;
}
```

For bottom sheets, allow upward drag beyond the top snap point with friction. This creates the "elastic" feel that makes iOS sheets satisfying.

## Scroll and drag conflicts

When an element is both scrollable and draggable (e.g., a bottom sheet with scrollable content), resolve the conflict:
- If scrolled to top and dragging down → engage drag (sheet dismiss)
- If scrolled past top → engage scroll
- Track `scrollTop` to decide which behavior takes over

## Snap points

Use velocity-aware snapping. If the user flings toward a snap point, snap there even if they're closer to a different one:

```ts
function getSnapPoint(current: number, velocity: number, snapPoints: number[]): number {
  // If velocity is significant, bias toward the direction of movement
  const biased = current + velocity * 100; // Project forward based on momentum
  return snapPoints.reduce((closest, point) =>
    Math.abs(point - biased) < Math.abs(closest - biased) ? point : closest
  );
}
```

## Pointer capture

For drag operations, use `setPointerCapture` to ensure the element receives all pointer events even if the cursor moves outside it:

```ts
function onPointerDown(e: PointerEvent) {
  e.currentTarget.setPointerCapture(e.pointerId);
}
```

This prevents the janky behavior where dragging too fast causes the cursor to leave the element and the drag to "stick."
