# Specification

## Summary
**Goal:** Fix the black background issue throughout the Indian Wedding Invitations app so all content is fully visible and readable.

**Planned changes:**
- Replace all black or near-black background colors with light/themed values (ivory, cream, white) across all pages and components
- Fix CSS custom properties (`--background`, `--foreground`) and body/root background styles in `index.css` files to use light theme values by default
- Ensure dark mode CSS variables do not bleed into the default light theme
- Apply the existing design system color tokens (ivory, crimson, gold, rose, charcoal) consistently across the landing page, dashboard, create wizard, invitation editor, and guest invitation page

**User-visible outcome:** The app renders with a proper light/themed background on all pages immediately on load, with all text, buttons, cards, forms, and headers fully visible and readable.
