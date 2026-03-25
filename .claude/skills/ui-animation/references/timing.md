# Timing & Duration

Speed is the second pillar of tasty animation. The #1 timing mistake: animations that are too slow. When in doubt, make it faster.

## Duration guidelines

| Element | Duration | Notes |
|---------|----------|-------|
| Micro feedback (button, toggle, checkbox) | 100–200ms | Should feel instant |
| Standard UI (dropdown, tooltip, popover) | 150–250ms | The sweet spot for most things |
| Larger transitions (modal, sidebar, page) | 250–400ms | Gives the eye time to track |
| Drawers and sheets | ~500ms | Drawers need room to breathe — they move a lot of pixels |
| Marketing/illustrative | Up to 1000ms | The only context where slow is OK |

**The 300ms ceiling:** If a UI animation takes longer than 300ms, it should be either a drawer, a page transition, or a marketing animation. Everything else at >300ms feels disconnected from the user's action.

## Asymmetric timing

Press and release are different actions with different purposes. The press can be deliberate (giving the user time to reconsider), while the release should be snappy.

```css
/* Hold-to-confirm pattern */
.progress {
  transition: clip-path 200ms ease-out; /* Fast release */
}
.button:active .progress {
  transition: clip-path 2s linear; /* Slow press — user can reconsider */
}
```

This same principle applies to hover states: enter can be slightly faster than exit to make the interface feel eager to respond.

## Tooltip delays

First tooltip appearance should have a slight delay (~200ms) to prevent accidental triggers. But once one tooltip is visible, subsequent tooltips on nearby elements should appear instantly — the user is clearly exploring.

```css
.tooltip {
  transition: transform 125ms ease-out, opacity 125ms ease-out;
}
.tooltip[data-instant] {
  transition-duration: 0ms; /* Instant for subsequent tooltips */
}
```

## The "faster is better" principle

When something doesn't feel right, try making it faster before changing anything else. A 200ms animation with a mediocre curve often feels better than a 400ms animation with a perfect curve. Speed creates the impression of responsiveness, which is the most important quality in UI motion.
