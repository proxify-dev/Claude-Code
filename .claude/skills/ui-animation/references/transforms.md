# Transform Techniques

Transforms are the workhorse of UI animation — they're GPU-composited, don't trigger layout, and give you position, scale, and rotation in one property.

## Scale

**Button press — `scale(0.97)`:** The magic number for tactile press feedback. Enough to feel, subtle enough to not distract.

```css
.button {
  transition: transform 150ms ease-out;
}
.button:active {
  transform: scale(0.97);
}
```

**Never animate from `scale(0)`.** It looks like the element is materializing from nothing — broken and unnatural. Start from at least `scale(0.85)`, ideally `scale(0.9–0.95)`:

```css
/* Broken — appears from nothing */
.element { transform: scale(0); }

/* Correct — subtle entrance */
.element { transform: scale(0.95); opacity: 0; }
.element.visible { transform: scale(1); opacity: 1; }
```

**Scale affects children.** When you scale a parent, all children scale too. If a child has text or precise sizing, you may need to counter-scale it or apply the transform to a wrapper that doesn't contain the content.

## Translate

**Use percentages for `translateY`/`translateX`** when the animation should be relative to the element's own size. This makes animations work across different screen sizes:

```css
/* Fixed value — breaks at different sizes */
.drawer { transform: translateY(400px); }

/* Percentage — always relative to element height */
.drawer { transform: translateY(100%); }
```

**Use `translate3d` over `translateX`/`translateY`** to force GPU compositing:

```css
/* Forces GPU layer */
.element { transform: translate3d(0, 6px, 0); }
```

## Transform origin

Set `transform-origin` at the trigger point — where the user clicked or where the element conceptually comes from. This makes the animation feel physically connected to its cause:

```css
/* Popover opens from its anchor */
.popover[data-side="top"]    { transform-origin: bottom center; }
.popover[data-side="bottom"] { transform-origin: top center; }
.popover[data-side="left"]   { transform-origin: center right; }
.popover[data-side="right"]  { transform-origin: center left; }

/* Context menu opens from cursor position */
.menu { transform-origin: var(--cursor-x) var(--cursor-y); }
```

## 3D transforms

For card flips, perspective effects, or layered animations, use `transform-style: preserve-3d` on the parent and set `perspective` to control depth:

```css
.card-container {
  perspective: 1000px;
  transform-style: preserve-3d;
}
.card {
  transition: transform 500ms cubic-bezier(0.25, 1, 0.5, 1);
}
.card.flipped {
  transform: rotateY(180deg);
}
```
