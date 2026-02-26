import React, { useState } from 'react';
import { useInvitationForm } from '@/context/InvitationFormContext';
import { getTemplateById } from '@/utils/templateDefinitions';
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

  const template = getTemplateById(formData.selectedTemplate);

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
    <div className="luxury-card rounded-2xl p-8">
      <h2 className="font-display text-2xl text-charcoal mb-6">Review & Create</h2>

      {/* Summary */}
      <div className="space-y-4 mb-8">
        <div className="bg-ivory-dark rounded-xl p-4">
          <h3 className="font-elegant font-semibold text-charcoal mb-3">Couple Details</h3>
          <div className="space-y-1 font-serif text-charcoal-light text-sm">
            <p><span className="text-charcoal font-medium">Names:</span> {formData.brideName} & {formData.groomName}</p>
            <p><span className="text-charcoal font-medium">Date:</span> {formData.weddingDate}</p>
            <p><span className="text-charcoal font-medium">Venue:</span> {formData.venueName}</p>
          </div>
        </div>

        <div className="bg-ivory-dark rounded-xl p-4">
          <h3 className="font-elegant font-semibold text-charcoal mb-3">Events</h3>
          {formData.events.length === 0 ? (
            <p className="font-serif text-charcoal-light text-sm">No events added</p>
          ) : (
            <div className="space-y-1">
              {formData.events.map(event => (
                <p key={event.id} className="font-serif text-charcoal-light text-sm">
                  • {event.title} — {event.date}
                </p>
              ))}
            </div>
          )}
        </div>

        <div className="bg-ivory-dark rounded-xl p-4">
          <h3 className="font-elegant font-semibold text-charcoal mb-3">Template & Theme</h3>
          <div className="space-y-1 font-serif text-charcoal-light text-sm">
            <p><span className="text-charcoal font-medium">Template:</span> <strong>{template?.name ?? formData.selectedTemplate}</strong></p>
            <p><span className="text-charcoal font-medium">Color Scheme:</span> {formData.colorScheme}</p>
            <p><span className="text-charcoal font-medium">Font:</span> {formData.fontChoice}</p>
          </div>
        </div>

        <div className="bg-ivory-dark rounded-xl p-4">
          <h3 className="font-elegant font-semibold text-charcoal mb-3">Media</h3>
          <div className="space-y-1 font-serif text-charcoal-light text-sm">
            <p><span className="text-charcoal font-medium">Photos:</span> {formData.photos.length} uploaded</p>
            <p><span className="text-charcoal font-medium">Music:</span> {formData.musicUrl ? 'Added' : 'None'}</p>
          </div>
        </div>
      </div>

      {/* Slug Input */}
      <div className="mb-8">
        <Label className="font-elegant text-charcoal mb-2 block">
          Invitation URL Slug *
        </Label>
        <div className="flex items-center gap-2">
          <span className="font-elegant text-charcoal-light text-sm whitespace-nowrap">
            {window.location.origin}/invitation/
          </span>
          <Input
            value={slug}
            onChange={e => handleSlugChange(e.target.value)}
            placeholder="your-unique-slug"
            className="border-gold/30 focus:border-gold"
          />
        </div>
        {slugError && (
          <p className="text-crimson text-sm mt-1 font-elegant">{slugError}</p>
        )}
        <p className="text-charcoal-light text-xs mt-1 font-elegant">
          This will be the unique URL for your invitation. Use only lowercase letters, numbers, and hyphens.
        </p>
      </div>

      {submitError && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm font-elegant">
          <strong>Error:</strong> {submitError}
        </div>
      )}

      <div className="flex justify-between">
        <button
          onClick={onBack}
          disabled={isSubmitting}
          className="flex items-center gap-2 border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory font-elegant font-semibold px-6 py-3 rounded-full transition-all duration-300 disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </button>
        <button
          onClick={handleSubmit}
          disabled={isSubmitting || !slug}
          className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-charcoal font-elegant font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-luxury disabled:opacity-50"
        >
          {isSubmitting && <Loader2 className="w-5 h-5 animate-spin" />}
          {isSubmitting ? 'Creating...' : 'Create Invitation'}
        </button>
      </div>
    </div>
  );
}
