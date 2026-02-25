# Specification

## Summary
**Goal:** Build WedInvite Studio — a full AI wedding invitation SaaS platform where users can create, customize, and share cinematic Indian wedding invitations via unique public URLs, with a creator dashboard, RSVP collection, photo gallery, and background music support.

**Planned changes:**

### Backend (Motoko — single actor in backend/main.mo)
- Data models: `Invitation` (slug-based ID, couple details, venue, template/theme choices, publish status), `Event` (type: Haldi/Mehndi/Sangeet/Wedding/Reception/Custom, date/time/venue), `RSVPEntry` (guest name, phone, attendance, count, message), `Photo` (base64/URL), `BackgroundMusic` (base64/URL, autoPlay flag)
- CRUD functions: `createInvitation` (with unique slug validation), `updateInvitation`, `getInvitationBySlug`, `getAllInvitations`, `publishInvitation`, `deleteInvitation`
- Event CRUD: `addEvent`, `updateEvent`, `deleteEvent`, `getEventsByInvitation`
- RSVP: `submitRSVP`, `getRSVPsByInvitation`
- Media: `addPhoto`, `deletePhoto`, `getPhotosByInvitation`, `setBackgroundMusic`, `getBackgroundMusic`
- All data stored in stable vars for upgrade safety

### Frontend (React + React Router, client-side routing)
- **`/`** — Platform landing page with hero section, feature highlights, sample invitation previews, and "Create Your Invitation" CTA
- **`/dashboard`** — Lists all invitations as cards (couple names, wedding date, Draft/Published badge, Edit/Preview/Publish/Delete actions)
- **`/dashboard/:slug`** — Tabbed invitation editor: Couple Details, Events, Template & Theme, Media, Preview
- **`/:slug`** — Read-only cinematic guest invitation view (publicly accessible for published invitations)
- **`/*`** — Styled 404 page; unpublished slugs show "Coming Soon" message

### Multi-step Creation Wizard
- Step 1: Couple Details (bride/groom names, couple photo upload with drag & drop preview, wedding date/time, venue name/address, Google Maps link, family details, invitation message); live progress bar
- Step 2: Multi-Event Management (add/edit/delete events with type selector, animated glassmorphism cards per event type with icons)
- On completion: calls `createInvitation` and redirects to `/dashboard/:slug`

### Template & Theme Selector
- 6 templates: 2 Royal Indian (gold/red/maroon, floral motifs), 2 Modern Minimal (ivory/blush, geometric), 2 Cinematic Dark (jewel tones, dramatic typography)
- Live mini-preview per template; color palette picker (presets + custom hex), font pairing selector (4 options including Devanagari-inspired and serif), background texture selector
- Switching templates preserves all invitation data; changes saved via `updateInvitation`

### Media Management
- Photo gallery: multi-image drag & drop, lazy-loaded thumbnail grid, hover zoom animation, delete per image, reordering
- Background music: MP3/WAV upload, auto-play toggle, preview player; floating music controller (play/pause/volume) in both dashboard preview and guest view

### Guest Invitation View (`/:slug`)
- Full-screen hero with couple photo, animated names, cinematic entrance
- Animated countdown timer to wedding date/time
- Couple intro section (invitation message, family details)
- Animated event timeline (cards with icon, date, time, venue per event type)
- Photo gallery with lightbox and scroll-reveal animations
- Venue section with "View on Google Maps" button (opens provided URL in new tab)
- RSVP form (name, phone, attendance, guest count, message) → `submitRSVP` → confirmation message
- WhatsApp share button pre-filled with invitation URL
- Floating background music controller (if music uploaded)
- Strictly read-only, zero edit controls, no authentication required

### Design System (applied globally)
- Palette: rich gold, ivory, deep crimson, blush rose
- Fonts: Cinzel or Cormorant Garamond for display headings, Inter for body
- Decorative mandala/floral SVG dividers between major sections
- Apple-level micro-animations: fade-ins, parallax hero, staggered card entrances (Framer Motion or CSS transitions)
- Glassmorphism cards for events and template selectors
- Button shimmer/glow hover effects, elegant form focus states
- Skeleton screen loading states
- Mobile-first fully responsive layout (375px and up)
- Static assets (hero-bg, mandala-divider, logo-mark, corner-flourish, watercolor-texture) referenced from `frontend/public/assets/generated`

**User-visible outcome:** Users can visit the platform, create a luxury Indian wedding invitation through a guided wizard, customize templates and themes, upload photos and music, manage multiple invitations from a dashboard, publish a unique public URL (e.g., `/shivangi-avanish`), and share a cinematic guest invitation where attendees can RSVP and view all event details.
