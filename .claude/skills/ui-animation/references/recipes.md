# Recipes

Practical patterns for common animated components. Each recipe uses the golden values from the main skill.

## Enter / exit (toast, notification, card)

```css
.toast {
  transform: translate3d(0, 6px, 0);
  opacity: 0;
  transition: transform 220ms cubic-bezier(0.22, 1, 0.36, 1),
              opacity 220ms cubic-bezier(0.22, 1, 0.36, 1);
}
.toast[data-open="true"] {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}
```

## Toast stacking (Sonner-style)

Create depth by scaling and offsetting each preceding toast:

```css
.toast {
  --lift: 14px;
  --index: 0; /* set via JS */
  transform:
    translateY(calc(var(--lift) * var(--index) * -1))
    scale(calc(1 - var(--index) * 0.05));
}
```

Toast 0: full size. Toast 1: `scale(0.95)`, offset 14px. Toast 2: `scale(0.90)`, offset 28px.

## Dropdown / popover / menu

Origin-aware scale from a subtle starting point:

```css
.menu {
  transform-origin: top right; /* set based on anchor position */
  transform: scale(0.88);
  opacity: 0;
  transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1),
              opacity 200ms cubic-bezier(0.22, 1, 0.36, 1);
}
.menu[data-open="true"] {
  transform: scale(1);
  opacity: 1;
}

/* Origin follows anchor side */
.popover[data-side="top"]    { transform-origin: bottom center; }
.popover[data-side="bottom"] { transform-origin: top center; }
.popover[data-side="left"]   { transform-origin: center right; }
.popover[data-side="right"]  { transform-origin: center left; }
```

## Drawer / sheet

Drawers move lots of pixels, so they need a longer duration and the move easing:

```css
.drawer {
  transform: translate3d(100%, 0, 0);
  transition: transform 500ms cubic-bezier(0.32, 0.72, 0, 1);
}
.drawer[data-open="true"] {
  transform: translate3d(0, 0, 0);
}
```

For bottom sheets, use `translateY(100%)` with snap points.

## Staggered list reveal

Children cascade in with 30–50ms delays. Keep total stagger time under 300ms (e.g., 6 items × 50ms = 300ms):

```css
.list > * {
  animation: fade-in 220ms cubic-bezier(0.22, 1, 0.36, 1) both;
}
.list > *:nth-child(2) { animation-delay: 50ms; }
.list > *:nth-child(3) { animation-delay: 100ms; }
.list > *:nth-child(4) { animation-delay: 150ms; }
```

```tsx
// Framer Motion variant
const container = {
  show: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
};
const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 }
};
```

## Tab / segment transitions

Use `clip-path` for the active indicator sliding between tabs — it's composited and avoids layout recalculation:

```css
.tab-indicator {
  transition: clip-path 200ms cubic-bezier(0.22, 1, 0.36, 1);
}
```

## Scroll-triggered reveal

Trigger when the element is ~100px into the viewport, not at the edge. This prevents elements from animating when barely visible:

```ts
const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target); // animate once
    }
  },
  { rootMargin: "-100px 0px" }
);
```

## Hover effects without flicker

When the hover effect moves an element (translateY), the element can leave the hover zone, causing flicker. Fix: apply hover on a parent, animate the child:

```css
.card:hover .card-inner {
  transform: translateY(-4px);
}
.card-inner {
  transition: transform 200ms ease;
}
```

Also fill gaps between trigger and target elements with padding or pseudo-elements to prevent hover dropout.

## Button press

```css
.button {
  transition: transform 150ms ease-out, opacity 150ms ease-out;
}
.button:active {
  transform: scale(0.97);
  opacity: 0.9;
}
```

## Blur bridging

When transitioning between states that look jarring (e.g., image swap, content change), a brief blur-and-fade bridges the gap:

```css
.content {
  transition: opacity 150ms ease, filter 150ms ease;
}
.content.transitioning {
  opacity: 0.6;
  filter: blur(4px);
}
```

Keep blur ≤ 20px to avoid performance issues.
