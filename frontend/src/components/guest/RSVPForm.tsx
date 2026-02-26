import React, { useState } from 'react';
import { useSubmitWeddingRSVP } from '../../hooks/useQueries';
import { Invitation } from '../../backend';
import { getTemplateById } from '../../utils/templateDefinitions';
import { Heart, Users, MessageSquare, Phone, CheckCircle, Loader2 } from 'lucide-react';

interface RSVPFormProps {
  invitation: Invitation;
  templateData?: ReturnType<typeof getTemplateById>;
}

export default function RSVPForm({ invitation, templateData }: RSVPFormProps) {
  const template = templateData || getTemplateById(invitation.selectedTemplate) || getTemplateById('royal-gold')!;
  const submitRSVP = useSubmitWeddingRSVP();

  const [formState, setFormState] = useState({
    guestName: '',
    guestPhone: '',
    attending: true,
    guestCount: 1,
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // Determine if template has a dark background
  const isDarkTemplate =
    invitation.backgroundChoice === 'dark-floral' ||
    invitation.backgroundChoice === 'dark-minimal' ||
    template.id?.includes('dark') ||
    template.id?.includes('midnight') ||
    template.id?.includes('cinematic');

  // Always use high-contrast colors for form readability
  const sectionBg = isDarkTemplate
    ? 'rgba(15, 10, 5, 0.85)'
    : 'rgba(255, 255, 255, 0.92)';
  const headingColor = isDarkTemplate ? '#f5f0e8' : '#2c1810';
  const labelColor = isDarkTemplate ? '#d4c4a8' : '#4a3728';
  const inputBg = isDarkTemplate ? 'rgba(30, 20, 10, 0.8)' : 'rgba(255, 255, 255, 0.95)';
  const inputBorder = isDarkTemplate ? 'rgba(180, 140, 80, 0.4)' : 'rgba(180, 140, 80, 0.5)';
  const inputText = isDarkTemplate ? '#f0e8d8' : '#2c1810';
  const placeholderClass = isDarkTemplate ? 'placeholder-amber-700/60' : 'placeholder-stone-400';
  const primaryColor = template.primaryColor || '#c9a84c';
  const mutedText = isDarkTemplate ? '#a09070' : '#7a6050';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rsvpId = `rsvp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    await submitRSVP.mutateAsync({
      invitationId: invitation.id,
      rsvpId,
      guestName: formState.guestName,
      guestPhone: formState.guestPhone,
      attending: formState.attending,
      guestCount: BigInt(formState.guestCount),
      message: formState.message,
    });
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <section
        className="py-16 px-4"
        style={{ background: isDarkTemplate ? 'rgba(10, 8, 4, 0.9)' : 'rgba(253, 248, 240, 0.95)' }}
      >
        <div className="max-w-md mx-auto text-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: `${primaryColor}25` }}
          >
            <CheckCircle className="w-10 h-10" style={{ color: primaryColor }} />
          </div>
          <h2
            className="text-3xl font-bold mb-4"
            style={{
              fontFamily: `'${template.headingFont}', serif`,
              color: headingColor,
            }}
          >
            {formState.attending ? 'See You There!' : 'Thank You'}
          </h2>
          <p className="text-lg mb-2" style={{ color: labelColor }}>
            {formState.attending
              ? `We're so excited to celebrate with you, ${formState.guestName}!`
              : `Thank you for letting us know, ${formState.guestName}.`}
          </p>
          <p className="text-sm" style={{ color: mutedText }}>
            {formState.attending
              ? `We look forward to seeing you at ${invitation.venueName}.`
              : 'You will be missed on our special day.'}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="rsvp"
      className="py-16 px-4"
      style={{ background: isDarkTemplate ? 'rgba(10, 8, 4, 0.9)' : 'rgba(253, 248, 240, 0.95)' }}
    >
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: `linear-gradient(90deg, transparent, ${primaryColor})` }} />
            <Heart className="w-5 h-5" style={{ color: primaryColor }} />
            <div className="h-px w-12" style={{ background: `linear-gradient(90deg, ${primaryColor}, transparent)` }} />
          </div>
          <h2
            className="text-4xl font-bold mb-3"
            style={{
              fontFamily: `'${template.headingFont}', serif`,
              color: headingColor,
            }}
          >
            RSVP
          </h2>
          <p className="text-base" style={{ color: labelColor }}>
            Kindly respond by{' '}
            {invitation.weddingDate
              ? new Date(invitation.weddingDate).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })
              : 'the wedding date'}
          </p>
        </div>

        {/* Form Card */}
        <div
          className="rounded-2xl p-6 sm:p-8 shadow-2xl"
          style={{
            background: sectionBg,
            border: `1px solid ${primaryColor}30`,
          }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Guest Name */}
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: labelColor }}
              >
                Your Full Name *
              </label>
              <input
                type="text"
                required
                value={formState.guestName}
                onChange={(e) => setFormState({ ...formState, guestName: e.target.value })}
                placeholder="Enter your full name"
                className={`w-full px-4 py-3 rounded-xl text-sm outline-none transition-all ${placeholderClass}`}
                style={{
                  background: inputBg,
                  border: `1.5px solid ${inputBorder}`,
                  color: inputText,
                }}
                onFocus={(e) => (e.target.style.borderColor = primaryColor)}
                onBlur={(e) => (e.target.style.borderColor = inputBorder)}
              />
            </div>

            {/* Phone */}
            <div>
              <label
                className="block text-sm font-semibold mb-2"
                style={{ color: labelColor }}
              >
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" />
                  Phone Number
                </span>
              </label>
              <input
                type="tel"
                value={formState.guestPhone}
                onChange={(e) => setFormState({ ...formState, guestPhone: e.target.value })}
                placeholder="+91 98765 43210"
                className={`w-full px-4 py-3 rounded-xl text-sm outline-none transition-all ${placeholderClass}`}
                style={{
                  background: inputBg,
                  border: `1.5px solid ${inputBorder}`,
                  color: inputText,
                }}
                onFocus={(e) => (e.target.style.borderColor = primaryColor)}
                onBlur={(e) => (e.target.style.borderColor = inputBorder)}
              />
            </div>

            {/* Attendance */}
            <div>
              <label className="block text-sm font-semibold mb-3" style={{ color: labelColor }}>
                Will you be attending? *
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: true, label: '✓ Joyfully Accept', emoji: '🎉' },
                  { value: false, label: '✗ Regretfully Decline', emoji: '💌' },
                ].map(({ value, label, emoji }) => (
                  <button
                    key={String(value)}
                    type="button"
                    onClick={() => setFormState({ ...formState, attending: value })}
                    className="py-3 px-4 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background:
                        formState.attending === value
                          ? primaryColor
                          : isDarkTemplate
                          ? 'rgba(40, 30, 15, 0.8)'
                          : 'rgba(240, 235, 225, 0.9)',
                      color:
                        formState.attending === value
                          ? '#1a1008'
                          : isDarkTemplate
                          ? '#c8b898'
                          : '#4a3728',
                      border: `1.5px solid ${formState.attending === value ? primaryColor : inputBorder}`,
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Guest Count */}
            {formState.attending && (
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: labelColor }}>
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    Number of Guests
                  </span>
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setFormState({ ...formState, guestCount: Math.max(1, formState.guestCount - 1) })}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all"
                    style={{
                      background: isDarkTemplate ? 'rgba(40, 30, 15, 0.8)' : 'rgba(240, 235, 225, 0.9)',
                      border: `1.5px solid ${inputBorder}`,
                      color: isDarkTemplate ? '#c8b898' : '#4a3728',
                    }}
                  >
                    −
                  </button>
                  <span
                    className="text-2xl font-bold w-12 text-center"
                    style={{ color: headingColor }}
                  >
                    {formState.guestCount}
                  </span>
                  <button
                    type="button"
                    onClick={() => setFormState({ ...formState, guestCount: Math.min(20, formState.guestCount + 1) })}
                    className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-all"
                    style={{
                      background: isDarkTemplate ? 'rgba(40, 30, 15, 0.8)' : 'rgba(240, 235, 225, 0.9)',
                      border: `1.5px solid ${inputBorder}`,
                      color: isDarkTemplate ? '#c8b898' : '#4a3728',
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: labelColor }}>
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Message for the Couple (optional)
                </span>
              </label>
              <textarea
                value={formState.message}
                onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                placeholder="Share your wishes or a special message..."
                rows={3}
                className={`w-full px-4 py-3 rounded-xl text-sm outline-none transition-all resize-none ${placeholderClass}`}
                style={{
                  background: inputBg,
                  border: `1.5px solid ${inputBorder}`,
                  color: inputText,
                }}
                onFocus={(e) => (e.target.style.borderColor = primaryColor)}
                onBlur={(e) => (e.target.style.borderColor = inputBorder)}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitRSVP.isPending || !formState.guestName.trim()}
              className="w-full py-4 rounded-xl font-bold text-base transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              style={{
                background: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}cc)`,
                color: '#1a1008',
                boxShadow: `0 4px 20px ${primaryColor}40`,
              }}
            >
              {submitRSVP.isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5" />
                  <span>{formState.attending ? 'Confirm Attendance' : 'Send Response'}</span>
                </>
              )}
            </button>

            {submitRSVP.isError && (
              <p className="text-center text-sm" style={{ color: '#e05555' }}>
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
