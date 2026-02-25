import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight, Loader2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { InvitationFormProvider, useInvitationForm } from '@/context/InvitationFormContext';
import ProgressBar from '@/components/wizard/ProgressBar';
import CoupleDetailsStep from '@/components/wizard/CoupleDetailsStep';
import EventManagementStep from '@/components/wizard/EventManagementStep';
import TemplateThemeStep from '@/components/wizard/TemplateThemeStep';
import MediaManagementStep from '@/components/wizard/MediaManagementStep';
import ReviewStep from '@/components/wizard/ReviewStep';
import {
  useCreateInvitation,
  useAddEvent,
  useAddPhoto,
  useSetBackgroundMusic,
} from '@/hooks/useQueries';
import { toast } from 'sonner';
import { Link } from '@tanstack/react-router';

const STEPS = [
  { label: 'Couple Details' },
  { label: 'Events' },
  { label: 'Template' },
  { label: 'Media' },
  { label: 'Review' },
];

function validateStep(step: number, formData: ReturnType<typeof useInvitationForm>['formData']): string | null {
  if (step === 1) {
    if (!formData.brideName.trim()) return 'Please enter the bride\'s name';
    if (!formData.groomName.trim()) return 'Please enter the groom\'s name';
    if (!formData.weddingDate) return 'Please select the wedding date';
    if (!formData.weddingTime) return 'Please select the wedding time';
    if (!formData.venueName.trim()) return 'Please enter the venue name';
    if (!formData.venueAddress.trim()) return 'Please enter the venue address';
    if (!formData.invitationMessage.trim()) return 'Please write an invitation message';
  }
  return null;
}

function WizardContent() {
  const navigate = useNavigate();
  const { formData, currentStep, setCurrentStep, totalSteps } = useInvitationForm();
  const [slug, setSlug] = useState('');
  const [slugError, setSlugError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createInvitation = useCreateInvitation();
  const addEvent = useAddEvent();
  const addPhoto = useAddPhoto();
  const setBackgroundMusic = useSetBackgroundMusic();

  const handleNext = () => {
    const error = validateStep(currentStep, formData);
    if (error) {
      toast.error(error);
      return;
    }
    setCurrentStep(Math.min(currentStep + 1, totalSteps));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setCurrentStep(Math.max(currentStep - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async () => {
    if (!slug.trim()) {
      setSlugError('Please enter a unique URL slug');
      return;
    }
    if (!/^[a-z0-9-]+$/.test(slug)) {
      setSlugError('Slug can only contain lowercase letters, numbers, and hyphens');
      return;
    }
    setSlugError('');
    setIsSubmitting(true);

    try {
      // 1. Create invitation
      await createInvitation.mutateAsync({
        slug,
        brideName: formData.brideName,
        groomName: formData.groomName,
        weddingDate: formData.weddingDate,
        weddingTime: formData.weddingTime,
        venueName: formData.venueName,
        venueAddress: formData.venueAddress,
        googleMapsLink: formData.googleMapsLink,
        familyDetails: formData.familyDetails,
        invitationMessage: formData.invitationMessage,
        selectedTemplate: formData.selectedTemplate,
        colorScheme: formData.colorScheme,
        fontChoice: formData.fontChoice,
        backgroundChoice: formData.backgroundChoice,
      });

      // 2. Add events
      for (const event of formData.events) {
        await addEvent.mutateAsync({
          invitationId: slug,
          eventId: event.id,
          title: event.title,
          date: event.date,
          time: event.time,
          venue: event.venue,
          description: event.description,
          eventType: event.eventType,
        });
      }

      // 3. Add photos
      for (const photo of formData.photos) {
        await addPhoto.mutateAsync({
          invitationId: slug,
          photoId: photo.id,
          imageUrl: photo.imageUrl,
        });
      }

      // 4. Add music
      if (formData.musicUrl) {
        await setBackgroundMusic.mutateAsync({
          invitationId: slug,
          musicId: `music-${Date.now()}`,
          musicUrl: formData.musicUrl,
          autoPlay: formData.musicAutoPlay,
        });
      }

      toast.success('Invitation created successfully! 🎉');
      navigate({ to: '/dashboard/$slug', params: { slug } });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to create invitation';
      if (message.includes('already taken')) {
        setSlugError('This URL is already taken. Please choose a different one.');
      } else {
        toast.error(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-gold/20 shadow-xs">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-gold" />
            <span className="font-cinzel text-lg font-bold text-gold-dark">VIVAH</span>
          </Link>
          <span className="font-inter text-sm text-muted-foreground">
            Step {currentStep} of {totalSteps}
          </span>
        </div>
        <div className="max-w-4xl mx-auto px-4">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} steps={STEPS} />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 py-10">
        {currentStep === 1 && <CoupleDetailsStep />}
        {currentStep === 2 && <EventManagementStep />}
        {currentStep === 3 && <TemplateThemeStep />}
        {currentStep === 4 && <MediaManagementStep />}
        {currentStep === 5 && (
          <ReviewStep
            slug={slug}
            onSlugChange={(val) => { setSlug(val); setSlugError(''); }}
            slugError={slugError}
          />
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="rounded-full font-cinzel tracking-wider border-gold/30 text-gold-dark hover:bg-gold/5 disabled:opacity-40"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {currentStep < totalSteps ? (
            <Button
              onClick={handleNext}
              className="btn-gold rounded-full font-cinzel tracking-wider px-8"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="btn-gold rounded-full font-cinzel tracking-wider px-8"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  Create Invitation
                  <Heart className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          )}
        </div>
      </main>
    </div>
  );
}

export default function CreateInvitationWizard() {
  return (
    <InvitationFormProvider>
      <WizardContent />
    </InvitationFormProvider>
  );
}
