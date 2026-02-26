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

  const isDarkTemplate =
    invitation.backgroundChoice === 'dark-floral' ||
    invitation.backgroundChoice === 'dark-minimal' ||
    template.id?.includes('dark') ||
    template.id?.includes('midnight') ||
    template.id?.includes('cinematic');

  const sectionBg = isDarkTemplate
    ? 'rgba(15, 10, 5, 0.85)'
    : 'rgba(255, 255, 255, 0.92)';
  const headingColor = isDarkTemplate ? '#f5f0e8' : '#2c1810';
  const labelColor = isDarkTemplate ? '#d4c4a8' : '#4a3728';
  const inputBg = isDarkTemplate ? 'rgba(30, 20, 10, 0.8)' : 'rgba(255, 255, 255, 0.95)';
  const inputBorder = isDarkTemplate ? 'rgba(180, 140, 80, 0.4)' : 'rgba(180, 140, 80, 0.5)';
  const inputText = isDarkTemplate ? '#f0e8d8' : '#2c1810';
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
      guestCount: formState.guestCount,
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
            {formState.attending ? 'See You There! 🎉' : 'Thank You for Letting Us Know'}
          </h2>
          <p style={{ color: mutedText }}>
            {formState.attending
              ? `We're so excited to celebrate with you, ${formState.guestName}!`
              : `We'll miss you, ${formState.guestName}. Thank you for your response.`}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4" style={{ background: isDarkTemplate ? 'rgba(10, 8, 4, 0.9)' : 'rgba(253, 248, 240, 0.95)' }}>
      <div className="max-w-lg mx-auto">
        <div
          className="rounded-2xl p-8 shadow-2xl"
          style={{ background: sectionBg, border: `1px solid ${inputBorder}` }}
        >
          <div className="text-center mb-8">
            <Heart className="w-8 h-8 mx-auto mb-3" style={{ color: primaryColor }} />
            <h2
              className="text-3xl font-bold mb-2"
              style={{ fontFamily: `'${template.headingFont}', serif`, color: headingColor }}
            >
              RSVP
            </h2>
            <p style={{ color: mutedText, fontSize: '0.9rem' }}>
              Please let us know if you'll be joining us
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Guest Name */}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: labelColor }}>
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formState.guestName}
                onChange={e => setFormState(prev => ({ ...prev, guestName: e.target.value }))}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none focus:ring-2 transition-all"
                style={{
                  background: inputBg,
                  border: `1px solid ${inputBorder}`,
                  color: inputText,
                }}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: labelColor }}>
                <Phone className="w-4 h-4 inline mr-1" />
                Phone Number
              </label>
              <input
                type="tel"
                value={formState.guestPhone}
                onChange={e => setFormState(prev => ({ ...prev, guestPhone: e.target.value }))}
                placeholder="+91 XXXXX XXXXX"
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
                style={{
                  background: inputBg,
                  border: `1px solid ${inputBorder}`,
                  color: inputText,
                }}
              />
            </div>

            {/* Attending */}
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: labelColor }}>
                Will you be attending? *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormState(prev => ({ ...prev, attending: true }))}
                  className="py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background: formState.attending ? primaryColor : inputBg,
                    color: formState.attending ? '#fff' : inputText,
                    border: `1px solid ${formState.attending ? primaryColor : inputBorder}`,
                  }}
                >
                  ✓ Yes, I'll attend
                </button>
                <button
                  type="button"
                  onClick={() => setFormState(prev => ({ ...prev, attending: false }))}
                  className="py-3 rounded-xl text-sm font-semibold transition-all"
                  style={{
                    background: !formState.attending ? '#888' : inputBg,
                    color: !formState.attending ? '#fff' : inputText,
                    border: `1px solid ${!formState.attending ? '#888' : inputBorder}`,
                  }}
                >
                  ✗ Can't make it
                </button>
              </div>
            </div>

            {/* Guest Count */}
            {formState.attending && (
              <div>
                <label className="block text-sm font-medium mb-1.5" style={{ color: labelColor }}>
                  <Users className="w-4 h-4 inline mr-1" />
                  Number of Guests
                </label>
                <input
                  type="number"
                  min={1}
                  max={20}
                  value={formState.guestCount}
                  onChange={e => setFormState(prev => ({ ...prev, guestCount: parseInt(e.target.value) || 1 }))}
                  className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all"
                  style={{
                    background: inputBg,
                    border: `1px solid ${inputBorder}`,
                    color: inputText,
                  }}
                />
              </div>
            )}

            {/* Message */}
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: labelColor }}>
                <MessageSquare className="w-4 h-4 inline mr-1" />
                Message (Optional)
              </label>
              <textarea
                value={formState.message}
                onChange={e => setFormState(prev => ({ ...prev, message: e.target.value }))}
                placeholder="Share your wishes..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-all resize-none"
                style={{
                  background: inputBg,
                  border: `1px solid ${inputBorder}`,
                  color: inputText,
                }}
              />
            </div>

            <button
              type="submit"
              disabled={submitRSVP.isPending || !formState.guestName}
              className="w-full py-4 rounded-xl font-semibold text-white transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              style={{ background: primaryColor }}
            >
              {submitRSVP.isPending ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Heart className="w-5 h-5 fill-current" />
              )}
              {submitRSVP.isPending ? 'Submitting...' : 'Send RSVP'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
