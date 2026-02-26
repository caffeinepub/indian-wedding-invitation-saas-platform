# Specification

## Summary
**Goal:** Fix three issues in the Wedding Invitation Builder: separate bride/groom photo uploads, fix hidden action buttons on the Dashboard, and prevent "Create Invitation" CTA from appearing on wrong pages.

**Planned changes:**
- Replace the single couple photo field with two separate file upload inputs ("Bride Photo" and "Groom Photo") in CoupleDetailsStep and InvitationEditor, including preview thumbnails and independent storage
- Update InvitationFormContext to store `bridePhoto` and `groomPhoto` as separate fields, and update the backend Invitation type in main.mo accordingly
- Render both bride and groom photos side by side on the guest-facing invitation pages (HeroSection, CoupleIntroduction)
- Fix Dashboard layout so the Publish button and all invitation action controls remain visible and accessible regardless of editing state
- Hide the "Create Invitation" CTA from the Header on editor and wizard routes, and ensure it does not appear on the InvitationEditor, CreateInvitationWizard, or GuestInvitation pages

**User-visible outcome:** Users can upload separate photos for the bride and groom; the Dashboard always shows action buttons like Publish; and the "Create Invitation" button no longer appears or overlaps content on editor, wizard, or guest invitation pages.
