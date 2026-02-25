import React, { useState } from 'react';
import { Check, Calendar, MapPin, Music, Image as ImageIcon, Palette } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useInvitationForm } from '@/context/InvitationFormContext';
import { getEventConfig } from '@/utils/eventIcons';
import { getTemplateById } from '@/utils/templateDefinitions';

interface ReviewStepProps {
  slug: string;
  onSlugChange: (slug: string) => void;
  slugError: string;
}

export default function ReviewStep({ slug, onSlugChange, slugError }: ReviewStepProps) {
  const { formData } = useInvitationForm();
  const template = getTemplateById(formData.selectedTemplate);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return 'Not set';
    try {
      return new Date(dateStr).toLocaleDateString('en-IN', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      });
    } catch { return dateStr; }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="font-cinzel text-2xl md:text-3xl font-bold text-gold-dark mb-2">
          Review & Publish
        </h2>
        <p className="font-inter text-muted-foreground">
          Review your invitation details and choose a unique URL
        </p>
      </div>

      {/* Unique URL */}
      <div className="luxury-card p-6 border-2 border-gold/30">
        <h3 className="font-cinzel text-lg font-bold text-gold-dark mb-4">
          ✦ Choose Your Invitation URL
        </h3>
        <div className="space-y-2">
          <Label className="font-cinzel text-sm font-semibold tracking-wide">
            Unique Slug *
          </Label>
          <div className="flex items-center gap-2">
            <span className="font-inter text-sm text-muted-foreground bg-muted px-3 py-2 rounded-l-lg border border-r-0 border-border whitespace-nowrap">
              yoursite.com/
            </span>
            <Input
              value={slug}
              onChange={(e) => onSlugChange(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/--+/g, '-'))}
              placeholder="priya-arjun-2026"
              className={`input-luxury font-inter rounded-l-none ${slugError ? 'border-crimson' : ''}`}
            />
          </div>
          {slugError && (
            <p className="text-xs text-crimson font-inter">{slugError}</p>
          )}
          <p className="text-xs text-muted-foreground font-inter">
            Only lowercase letters, numbers, and hyphens. This will be your public invitation URL.
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Couple Details */}
        <div className="luxury-card p-5">
          <h4 className="font-cinzel text-sm font-bold text-gold-dark mb-3 flex items-center gap-2">
            <Check className="w-4 h-4" /> Couple Details
          </h4>
          <div className="space-y-2 font-inter text-sm">
            <p><span className="text-muted-foreground">Bride:</span> <strong>{formData.brideName || '—'}</strong></p>
            <p><span className="text-muted-foreground">Groom:</span> <strong>{formData.groomName || '—'}</strong></p>
            <p><span className="text-muted-foreground">Date:</span> {formatDate(formData.weddingDate)}</p>
            <p><span className="text-muted-foreground">Venue:</span> {formData.venueName || '—'}</p>
          </div>
        </div>

        {/* Events */}
        <div className="luxury-card p-5">
          <h4 className="font-cinzel text-sm font-bold text-gold-dark mb-3 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Events ({formData.events.length})
          </h4>
          {formData.events.length > 0 ? (
            <div className="space-y-2">
              {formData.events.map((event) => {
                const config = getEventConfig(event.eventType);
                return (
                  <div key={event.id} className="flex items-center gap-2 text-sm font-inter">
                    <span>{config.icon}</span>
                    <span className="font-medium">{event.title}</span>
                    <span className="text-muted-foreground">— {event.date}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="font-inter text-sm text-muted-foreground">No events added</p>
          )}
        </div>

        {/* Template */}
        <div className="luxury-card p-5">
          <h4 className="font-cinzel text-sm font-bold text-gold-dark mb-3 flex items-center gap-2">
            <Palette className="w-4 h-4" /> Template & Theme
          </h4>
          <div className="space-y-2 font-inter text-sm">
            <p><span className="text-muted-foreground">Template:</span> <strong>{template.name}</strong></p>
            <p><span className="text-muted-foreground">Color Scheme:</span> {formData.colorScheme}</p>
            <p><span className="text-muted-foreground">Font:</span> {formData.fontChoice}</p>
          </div>
        </div>

        {/* Media */}
        <div className="luxury-card p-5">
          <h4 className="font-cinzel text-sm font-bold text-gold-dark mb-3 flex items-center gap-2">
            <ImageIcon className="w-4 h-4" /> Media
          </h4>
          <div className="space-y-2 font-inter text-sm">
            <p>
              <span className="text-muted-foreground">Photos:</span>{' '}
              <strong>{formData.photos.length} uploaded</strong>
            </p>
            <p>
              <span className="text-muted-foreground">Music:</span>{' '}
              <strong>{formData.musicUrl ? `Yes (Auto-play: ${formData.musicAutoPlay ? 'On' : 'Off'})` : 'None'}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
