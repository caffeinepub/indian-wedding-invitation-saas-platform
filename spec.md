# Specification

## Summary
**Goal:** Fix the Color Scheme, Font Pairing, and Background Style selectors in the invitation editor so they correctly update the live preview and persist on save.

**Planned changes:**
- Fix `ColorSchemePicker` to call `updateFormData` with the correct field name so the selected color scheme is immediately reflected in `InvitationFormContext` and the live `TemplatePreview`.
- Fix `FontSelector` to call `updateFormData` with the correct field name so the selected font pairing is immediately reflected in `InvitationFormContext` and the live `TemplatePreview`.
- Fix the Background Style selector to call `updateFormData` with the correct field name so the selected background style is immediately reflected in `InvitationFormContext` and the live `TemplatePreview`.
- Audit `TemplatePreview` to ensure it reads `colorScheme`, `fontPairing`, and `backgroundStyle` reactively from `InvitationFormContext` rather than stale local state or props.
- Ensure that when an existing invitation is loaded, the saved `colorScheme`, `fontPairing`, and `backgroundStyle` values are correctly hydrated into `InvitationFormContext` so selectors and preview reflect the previously saved state on load.

**User-visible outcome:** Selecting a color scheme, font pairing, or background style in the invitation editor immediately updates the live preview, and those choices are correctly saved and restored when re-opening an existing invitation.
