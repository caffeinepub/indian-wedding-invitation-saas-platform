# Specification

## Summary
**Goal:** Expand the Wedding Invite Studio with 6 new advanced templates, richer customization options, and the ability to save invitations in multiple theme variants.

**Planned changes:**
- Add 6 new invitation templates (Floral Boho, Regal Emerald, Dusty Rose Romantic, Midnight Luxe, Rustic Parchment, Pastel Garden) to `templateDefinitions.ts`, each with unique font pairings, color palettes, gradient backgrounds, and decorative motifs
- Update `TemplateSelector` to group templates into categories (e.g., Royal Indian, Modern Minimal, Romantic, Dark Luxe, Boho & Floral, Vintage & Rustic), show richer styled preview cards, and add "New"/"Premium" badges to newly added templates
- Enhance `TemplateThemeStep` customization panel with a background style picker (solid, gradient, pattern, texture), an accent color intensity slider, a border/frame style selector (3+ options), and a layout density toggle (compact/spacious), all updating the live preview in real time
- Update the backend Motoko actor to add a `savedThemes` array field to the invitation record, and add `saveThemeVariant`, `getThemeVariants`, and `deleteThemeVariant` functions, while keeping the existing single `template` field and all CRUD operations intact
- Add "Save as Single Theme" and "Save as Theme Variant" buttons to the `TemplateThemeStep` in the wizard and editor, plus a scrollable row of saved variant thumbnail cards each with Apply and Delete actions
- Add `useSaveThemeVariant`, `useGetThemeVariants`, and `useDeleteThemeVariant` React Query hooks in `useQueries.ts`

**User-visible outcome:** Users can browse a larger, categorized template library, customize templates with more advanced styling controls, and save their invitation in multiple theme variants that they can switch between, apply, or delete at any time.
