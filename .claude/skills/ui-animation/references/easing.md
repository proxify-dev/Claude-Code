# Easing Curves

The easing curve is the single biggest factor in whether an animation feels "right." Built-in CSS keywords (`ease`, `ease-in`, `ease-out`) are too muted — they were designed for general purpose, not for UI that feels alive.

## The default: custom ease-out

Use `cubic-bezier(0.22, 1, 0.36, 1)` as your default for enter animations and hover transforms. It starts fast (immediate response to user action) and decelerates smoothly.

```css
/* Generic — feels flat */
.modal { transition: transform 200ms ease-out; }

/* Custom curve — feels intentional */
.modal { transition: transform 200ms cubic-bezier(0.22, 1, 0.36, 1); }
```

The difference is subtle in isolation but compounds across an interface. Built-in `ease-out` has a weak acceleration curve — the custom version has more energy at the start, making the UI feel like it's *responding* rather than *drifting*.

## Matching easing to context

Before picking a curve, ask: **what type of motion is this?**

| Context | Curve | Reasoning |
|---------|-------|-----------|
| Enter (appear, mount, open) | `cubic-bezier(0.22, 1, 0.36, 1)` | Ease-out: fast response, smooth arrival |
| Move (slide, reposition) | `cubic-bezier(0.25, 1, 0.5, 1)` | Softer ease-out for spatial movement |
| Exit (close, dismiss, unmount) | `cubic-bezier(0.22, 1, 0.36, 1)` | Same as enter — fast start, gentle finish |
| iOS-style drawer/sheet | `cubic-bezier(0.32, 0.72, 0, 1)` | The overshooting feel Apple uses |
| Simple hover (color, bg) | `ease` | The built-in keyword is fine here — it's not spatial |
| On-screen continuous motion | `cubic-bezier(0.37, 0, 0.63, 1)` | Ease-in-out for things already visible |

**Avoid `ease-in` for UI.** It starts slow, which makes the interface feel sluggish. The only place `ease-in` belongs is exit animations where the element accelerates away — and even then, ease-out usually feels better.

## Spring animations

Nothing in the real world moves on a bezier curve. Springs create motion that feels physically grounded — objects have mass, momentum, and settle naturally.

Use springs when:
- Dragging and releasing (the element should spring to its resting position)
- Counters or values that change (spring interpolation > instant jump)
- Any interaction where the user "throws" something

```tsx
// Spring for a drag-released element
<motion.div
  transition={{ type: "spring", stiffness: 500, damping: 40 }}
/>

// Spring-interpolated counter
const spring = useSpring(value, { stiffness: 100, damping: 30 });
```

**When NOT to spring:** Functional interfaces where speed is paramount (data entry, banking). High-frequency interactions. Anything the user does hundreds of times per session.

## Resources

- [easings.co](https://easings.co) — visual cubic-bezier explorer
- [easing.dev](https://easing.dev) — Emil Kowalski's easing reference
