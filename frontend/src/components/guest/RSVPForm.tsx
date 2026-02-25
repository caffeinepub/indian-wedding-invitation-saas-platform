import React, { useState } from 'react';
import { CheckCircle, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import type { Invitation } from '@/backend';
import { getTemplateById } from '@/utils/templateDefinitions';
import { useSubmitRSVP } from '@/hooks/useQueries';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { toast } from 'sonner';

interface RSVPFormProps {
  invitation: Invitation;
}

export default function RSVPForm({ invitation }: RSVPFormProps) {
  const template = getTemplateById(invitation.selectedTemplate);
  const { ref, isVisible } = useScrollAnimation();
  const submitRSVP = useSubmitRSVP();
  const [submitted, setSubmitted] = useState(false);

  const [guestName, setGuestName] = useState('');
  const [guestPhone, setGuestPhone] = useState('');
  const [attending, setAttending] = useState<'yes' | 'no'>('yes');
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) { toast.error('Please enter your name'); return; }

    try {
      await submitRSVP.mutateAsync({
        invitationId: invitation.id,
        rsvpId: `rsvp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        guestName,
        guestPhone,
        attending: attending === 'yes',
        guestCount: BigInt(guestCount),
        message,
      });
      setSubmitted(true);
    } catch {
      toast.error('Failed to submit RSVP. Please try again.');
    }
  };

  if (submitted) {
    return (
      <section className="py-16 px-4" style={{ background: `${template.primaryColor}08` }}>
        <div className="max-w-lg mx-auto text-center animate-scale-in">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
            style={{ background: `${template.primaryColor}20` }}
          >
            <CheckCircle className="w-10 h-10" style={{ color: template.primaryColor }} />
          </div>
          <h2
            className="font-cinzel text-2xl font-bold mb-3"
            style={{ fontFamily: template.headingFont, color: template.textColor }}
          >
            RSVP Received!
          </h2>
          <p className="font-inter text-sm" style={{ color: template.textColor, opacity: 0.7 }}>
            Thank you, {guestName}! We look forward to celebrating with you.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4" style={{ background: `${template.primaryColor}08` }}>
      <div
        ref={ref}
        className={`max-w-lg mx-auto transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="text-center mb-10">
          <p className="font-inter text-sm tracking-[0.3em] uppercase mb-3" style={{ color: template.primaryColor }}>
            ✦ RSVP ✦
          </p>
          <h2
            className="font-cinzel text-3xl font-bold"
            style={{ fontFamily: template.headingFont, color: template.textColor }}
          >
            Will You Join Us?
          </h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6 rounded-2xl border"
          style={{
            background: template.category === 'cinematic-dark' ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.8)',
            borderColor: `${template.primaryColor}25`,
          }}
        >
          <div className="space-y-2">
            <Label className="font-cinzel text-sm font-semibold tracking-wide" style={{ color: template.textColor }}>
              Your Name *
            </Label>
            <Input
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="Full name"
              className="input-luxury font-inter"
              required
            />
          </div>

          <div className="space-y-2">
            <Label className="font-cinzel text-sm font-semibold tracking-wide" style={{ color: template.textColor }}>
              Phone Number
            </Label>
            <Input
              value={guestPhone}
              onChange={(e) => setGuestPhone(e.target.value)}
              placeholder="+91 98765 43210"
              className="input-luxury font-inter"
              type="tel"
            />
          </div>

          <div className="space-y-3">
            <Label className="font-cinzel text-sm font-semibold tracking-wide" style={{ color: template.textColor }}>
              Will you attend? *
            </Label>
            <RadioGroup value={attending} onValueChange={(v) => setAttending(v as 'yes' | 'no')} className="flex gap-6">
              <div className="flex items-center gap-2">
                <RadioGroupItem value="yes" id="yes" />
                <Label htmlFor="yes" className="font-inter cursor-pointer" style={{ color: template.textColor }}>
                  Joyfully Accept ✓
                </Label>
              </div>
              <div className="flex items-center gap-2">
                <RadioGroupItem value="no" id="no" />
                <Label htmlFor="no" className="font-inter cursor-pointer" style={{ color: template.textColor }}>
                  Regretfully Decline
                </Label>
              </div>
            </RadioGroup>
          </div>

          {attending === 'yes' && (
            <div className="space-y-2">
              <Label className="font-cinzel text-sm font-semibold tracking-wide" style={{ color: template.textColor }}>
                Number of Guests
              </Label>
              <Input
                type="number"
                min={1}
                max={10}
                value={guestCount}
                onChange={(e) => setGuestCount(parseInt(e.target.value) || 1)}
                className="input-luxury font-inter w-24"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label className="font-cinzel text-sm font-semibold tracking-wide" style={{ color: template.textColor }}>
              Message (Optional)
            </Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Share your wishes with the couple..."
              rows={3}
              className="input-luxury font-inter resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={submitRSVP.isPending}
            className="w-full rounded-full font-cinzel tracking-wider py-3"
            style={{
              background: `linear-gradient(135deg, ${template.primaryColor}, ${template.accentColor})`,
              color: template.category === 'cinematic-dark' ? '#0D0820' : '#2C1810',
            }}
          >
            {submitRSVP.isPending ? (
              <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...</>
            ) : (
              'Send RSVP'
            )}
          </Button>
        </form>
      </div>
    </section>
  );
}
