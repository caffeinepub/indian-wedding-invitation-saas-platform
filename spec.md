# Specification

## Summary
**Goal:** Fully restore the Wedding Invitations app to its exact Version 5 state by rolling back all backend and frontend changes introduced after Version 5.

**Planned changes:**
- Restore `backend/main.mo` to Version 5, including all data types (Invitation, Event, RSVP, Photo, Music), CRUD operations, blob storage, and access control logic
- Restore `App.tsx` routes and providers to Version 5
- Restore all frontend pages (LandingPage, Dashboard, CreateInvitationWizard, InvitationEditor, GuestInvitation, NotFound) to Version 5
- Restore all components (AuthGuard, Header, wizard steps, guest components, media, templates, events, layout) to Version 5
- Restore `useQueries.ts`, `InvitationFormContext.tsx`, utils, and stylesheets to Version 5
- Revert any login-gating removal, anonymous actor changes, or other modifications made after Version 5

**User-visible outcome:** The app looks and behaves exactly as it did in Version 5, with all authentication gating, pages, and functionality fully restored.
