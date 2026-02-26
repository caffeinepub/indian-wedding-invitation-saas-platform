import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { InvitationFormProvider, useInvitationForm } from '../context/InvitationFormContext';
import CoupleDetailsStep from '../components/wizard/CoupleDetailsStep';
import EventManagementStep from '../components/wizard/EventManagementStep';
import TemplateThemeStep from '../components/wizard/TemplateThemeStep';
import MediaManagementStep from '../components/wizard/MediaManagementStep';
import ReviewStep from '../components/wizard/ReviewStep';
import {
  useCreateInvitation,
  useAddPhotos,
  useAddEvent,
  useSetBackgroundMusic,
} from '../hooks/useQueries';
import { ExternalBlob, EventType } from '../backend';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const STEPS = [
  { id: 0, label: 'Couple Details' },
  { id: 1, label: 'Events' },
  { id: 2, label: 'Theme' },
  { id: 3, label: 'Media' },
  { id: 4, label: 'Review' },
];

function WizardContent() {
  const navigate = useNavigate();
  const { formData, currentStep, setCurrentStep, resetForm } = useInvitationForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createInvitation = useCreateInvitation();
  const addPhotos = useAddPhotos();
  const addEvent = useAddEvent();
  const setBackgroundMusic = useSetBackgroundMusic();

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (finalSlug: string) => {
    setIsSubmitting(true);
    try {
      // Create invitation
      const invitation = await createInvitation.mutateAsync({
        slug: finalSlug,
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

      // Upload bride/groom photos if provided
      if (formData.bridePhoto || formData.groomPhoto) {
        let brideBlob: ExternalBlob | null = null;
        let groomBlob: ExternalBlob | null = null;

        if (formData.bridePhoto) {
          const bytes = new Uint8Array(await formData.bridePhoto.arrayBuffer());
          brideBlob = ExternalBlob.fromBytes(bytes);
        }
        if (formData.groomPhoto) {
          const bytes = new Uint8Array(await formData.groomPhoto.arrayBuffer());
          groomBlob = ExternalBlob.fromBytes(bytes);
        }

        await addPhotos.mutateAsync({
          invitationId: invitation.id,
          bridePhoto: brideBlob,
          groomPhoto: groomBlob,
        });
      }

      // Add events
      for (const event of formData.events) {
        await addEvent.mutateAsync({
          invitationId: finalSlug,
          eventId: event.id,
          title: event.title,
          date: event.date,
          time: event.time,
          venue: event.venue,
          description: event.description,
          eventType: event.eventType as EventType,
        });
      }

      // Set background music
      if (formData.musicUrl) {
        const musicId = `music-${Date.now()}`;
        await setBackgroundMusic.mutateAsync({
          invitationId: finalSlug,
          musicId,
          musicUrl: formData.musicUrl,
          autoPlay: formData.musicAutoPlay,
        });
      }

      toast.success('Invitation created successfully!');
      resetForm();
      navigate({ to: '/dashboard' });
    } catch (error: any) {
      toast.error(error?.message || 'Failed to create invitation');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <CoupleDetailsStep onNext={handleNext} />;
      case 1:
        return <EventManagementStep onNext={handleNext} onBack={handleBack} />;
      case 2:
        return (
          <div className="space-y-4">
            <TemplateThemeStep />
            <div className="flex justify-between pt-2">
              <button
                onClick={handleBack}
                className="flex items-center gap-2 border border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory font-elegant font-semibold px-6 py-3 rounded-full transition-all duration-300"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-charcoal font-elegant font-semibold px-8 py-3 rounded-full transition-all duration-300 shadow-luxury"
              >
                Next
              </button>
            </div>
          </div>
        );
      case 3:
        return <MediaManagementStep onNext={handleNext} onBack={handleBack} />;
      case 4:
        return (
          <ReviewStep
            onBack={handleBack}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-ivory pt-20">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-10">
          <p className="font-script text-gold text-2xl mb-2">Create Your</p>
          <h1 className="font-display text-4xl text-charcoal">Wedding Invitation</h1>
        </div>

        {/* Step Progress */}
        <div className="flex items-center justify-center gap-2 mb-10">
          {STEPS.map((step, index) => (
            <React.Fragment key={step.id}>
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  currentStep >= step.id
                    ? 'bg-gold text-charcoal'
                    : 'bg-gold/20 text-charcoal/40'
                }`}
              >
                {step.id + 1}
              </div>
              {index < STEPS.length - 1 && (
                <div
                  className={`h-0.5 w-8 transition-colors ${
                    currentStep > step.id ? 'bg-gold' : 'bg-gold/20'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="mt-4">
          {renderStep()}
        </div>
      </div>
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
