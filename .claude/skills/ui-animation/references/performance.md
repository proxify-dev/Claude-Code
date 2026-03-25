# Performance

Animation jank destroys the illusion. A 60fps animation with the wrong curve looks better than a 30fps animation with the perfect curve. These rules keep your animations smooth.

## Animate only composited properties

The browser can animate `transform` and `opacity` on the GPU compositor thread without touching layout or paint. Everything else triggers work on the main thread:

- **Composited (fast):** `transform`, `opacity`
- **Paint-only (acceptable for simple hovers):** `color`, `background-color`, `box-shadow`
- **Layout-triggering (never animate):** `width`, `height`, `top`, `left`, `margin`, `padding`
- **Never:** `transition: all` — it animates properties you didn't intend

`clip-path` is a useful middle ground — it's composited in modern browsers and lets you do reveals, progress bars, and tab transitions without layout shifts.

## will-change

`will-change` promotes an element to its own GPU layer, preventing the 1px shift that happens when the browser moves elements between CPU and GPU rendering. But permanent `will-change` wastes GPU memory.

**Toggle it only during animation:**

```css
/* Don't do this */
.element { will-change: transform; }

/* Do this — apply only during active animation */
.element.animating { will-change: transform, opacity; }
```

In JS, add `will-change` just before starting the animation and remove it on `transitionend`.

## Hardware acceleration for busy main threads

When the main thread is doing heavy work (rendering large lists, processing data), CSS animations can stutter because they share the thread. Force GPU compositing with a no-op 3D transform:

```css
.element {
  transform: translate3d(0, 0, 0); /* Forces own compositing layer */
}
```

## Avoid CSS variables for drag animations

CSS custom properties (`--x`, `--y`) updated via JS in a drag loop are repainted every frame on the main thread. For drag animations, use `transform` directly via `element.style.transform` or a framework like Framer Motion that uses the compositor.

## Pause looping animations off-screen

Looping animations (spinners, pulsing indicators, ambient effects) consume GPU cycles even when not visible. Use IntersectionObserver to pause them:

```ts
const observer = new IntersectionObserver(([entry]) => {
  el.style.animationPlayState = entry.isIntersecting ? "running" : "paused";
});
observer.observe(el);
```

## Disable transitions during theme switches

When toggling light/dark mode, every element with a `transition` on `color` or `background` will visibly animate. Suppress this:

```css
[data-theme-switching="true"] * {
  transition: none !important;
}
```

Remove the attribute after a frame to re-enable transitions.
