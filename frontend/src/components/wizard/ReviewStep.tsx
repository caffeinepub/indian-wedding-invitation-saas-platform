import React, { useState } from 'react';
import { useInvitationForm } from '@/context/InvitationFormContext';
import { PREMIUM_THEMES } from '@/utils/templateDefinitions';
import { Loader2, ChevronLeft } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

export interface ReviewStepProps {
  onBack: () => void;
  onSubmit: (slug: string) => Promise<void>;
  isSubmitting: boolean;
  submitError?: string | null;
}

export default function ReviewStep({ onBack, onSubmit, isSubmitting, submitError }: ReviewStepProps) {
  const { formData } = useInvitationForm();
  const [slug, setSlug] = useState('');
  const [slugError, setSlugError] = useState('');

  const template = PREMIUM_THEMES.find(t => t.id === formData.selectedTemplate);

  const validateSlug = (value: string) => {
    if (!value) {
      setSlugError('URL slug is required');
      return false;
    }
    if (!/^[a-z0-9-]+$/.test(value)) {
      setSlugError('Only lowercase letters, numbers, and hyphens allowed');
      return false;
    }
    if (value.length < 3) {
      setSlugError('Slug must be at least 3 characters');
      return false;
    }
    setSlugError('');
    return true;
  };

  const handleSlugChange = (value: string) => {
    const cleaned = value.toLowerCase().replace(/[^a-z0-9-]/g, '');
    setSlug(cleaned);
    if (cleaned) validateSlug(cleaned);
  };

  const handleSubmit = () => {
    if (!validateSlug(slug)) return;
    onSubmit(slug);
  };

  return (
    <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
      <h2 className="text-2xl font-serif text-foreground mb-6">Review & Create</h2>

      {/* Summary */}
      <div className="space-y-4 mb-8">
        <div className="bg-muted/50 rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-3">Couple Details</h3>
          <div className="space-y-1 text-muted-foreground text-sm">
            <p><span className="text-foreground font-medium">Names:</span> {formData.brideName} & {formData.groomName}</p>
            <p><span className="text-foreground font-medium">Date:</span> {formData.weddingDate}</p>
            <p><span className="text-foreground font-medium">Venue:</span> {formData.venueName}</p>
          </div>
        </div>

        <div className="bg-muted/50 rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-3">Events</h3>
          {formData.events.filter(e => !e.isDeleted).length === 0 ? (
            <p className="text-muted-foreground text-sm">No events added</p>
          ) : (
            <div className="space-y-1">
              {formData.events.filter(e => !e.isDeleted).map(event => (
                <p key={event.id} className="text-muted-foreground text-sm">
                  • {event.title} — {event.date}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="bg-muted/50 rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-3">Template & Theme</h3>
          <div className="space-y-1 text-muted-foreground text-sm">
            <p><span className="text-foreground font-medium">Template:</span> <strong>{template?.name ?? formData.selectedTemplate}</strong></p>
            <p><span className="text-foreground font-medium">Color Scheme:</span> {formData.colorScheme}</p>
            <p><span className="text-foreground font-medium">Font:</span> {formData.fontChoice}</p>
          </div>
        </div>

        <div className="bg-muted/50 rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-3">Media</h3>
          <div className="space-y-1 text-muted-foreground text-sm">
            <p><span className="text-foreground font-medium">Photos:</span> {formData.photos.length} uploaded</p>
            <p><span className="text-foreground font-medium">Music:</span> {formData.musicUrl ? 'Added' : 'None'}</p>
          </div>
        </div>
      </div>

      {/* Slug Input */}
      <div className="mb-8">
        <Label className="text-foreground mb-2 block font-medium">
          Invitation URL Slug *
        </Label>
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-sm whitespace-nowrap">
            {window.location.origin}/invitation/
          </span>
          <Input
            value={slug}
            onChange={e => handleSlugChange(e.target.value)}
            placeholder="your-unique-slug"
            className="min-h-[44px]"
          />
        </div>
        {slugError && (
          <p className="text-destructive text-sm mt-1">{slugError}</p>
        )}
        <p className="text-muted-foreground text-xs mt-1">
          This will be the unique URL for your invitation. Use only lowercase letters, numbers, and hyphens.
        </p>
      </div>

      {submitError && (
        <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm">
          <strong>Error:</strong> {submitError}
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="flex items-center gap-2 border border-border text-foreground hover:bg-muted font-medium px-6 py-3 rounded-full transition-all disabled:opacity-50 min-h-[44px]"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !slug}
          className="flex items-center gap-2 bg-gold-500 hover:bg-gold-600 text-white font-medium px-8 py-3 rounded-full transition-all shadow-gold disabled:opacity-50 min-h-[44px]"
        >
          {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
          {isSubmitting ? 'Creating...' : 'Create Invitation'}
        </button>
      </div>
    </div>
  );
}
