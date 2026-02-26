# Specification

## Summary
**Goal:** Add a dedicated RSVP Responses viewer button to the dashboard, fix navigation link text visibility on the landing page, and fix the mobile music controller.

**Planned changes:**
- Add a visually distinct "View RSVP Responses" button (gold/crimson accent) to each invitation card on `/dashboard` and inside the invitation editor at `/dashboard/:slug`
- Clicking the button opens a modal/panel showing all RSVP submissions (Guest Name, Phone, Attending badge, Guest Count, Message, Submitted At) with a summary row (total responses, confirmed, declined) and an empty state when no RSVPs exist, fetched via the existing `getRSVPsByInvitation` hook
- Fix nav link text ("Home", "Dashboard") in `Header.tsx` to use light/ivory/gold colors in the transparent header state and remain readable when scrolled, with appropriate hover states on desktop and mobile
- Fix `MusicController.tsx` so the floating button has a minimum 44×44px touch target, tap events work on mobile browsers, audio playback respects mobile autoplay restrictions (requires user gesture), and the panel opens/closes correctly on mobile

**User-visible outcome:** Dashboard users can now view RSVP guest responses directly from invitation cards; navigation links are always readable on the landing page; and the background music controller works correctly on mobile devices.
