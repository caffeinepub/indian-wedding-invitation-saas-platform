import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInvitationForm } from '../context/InvitationFormContext';
import { useCreateInvitation, useAddEvent, useAddPhoto, useSetBackgroundMusic, useAddPhotos } from '../hooks/useQueries';
import { ExternalBlob } from '../backend';
import CoupleDetailsStep from '../components/wizard/CoupleDetailsStep';
import EventManagementStep from '../components/wizard/EventManagementStep';
import TemplateThemeStep from '../components/wizard/TemplateThemeStep';
import MediaManagementStep from '../components/wizard/MediaManagementStep';
import ReviewStep from '../components/wizard/ReviewStep';
import ProgressBar from '../components/wizard/ProgressBar';
import { Loader2 } from 'lucide-react';

const STEPS = [
  { id: 1, title: 'Couple Details', description: 'Tell us about the couple' },
  { id: 2, title: 'Events', description: 'Add your wedding events' },
  { id: 3, title: 'Template & Theme', description: 'Choose your style' },
  { id: 4, title: 'Media', description: 'Photos & music' },
  { id: 5, title: 'Review & Publish', description: 'Final review' },
];

export default function CreateInvitationWizard() {
  const navigate = useNavigate();
  const { formData, resetForm } = useInvitationForm();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const createInvitation = useCreateInvitation();
  const addEvent = useAddEvent();
  const addPhoto = useAddPhoto();
  const setBackgroundMusic = useSetBackgroundMusic();
  const addPhotos = useAddPhotos();

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async (slug: string) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Create the invitation
      const invitation = await createInvitation.mutateAsync({
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

      // Add events
      const activeEvents = formData.events.filter(e => !e.isDeleted);
      for (const event of activeEvents) {
        await addEvent.mutateAsync({
          invitationId: invitation.id,
          eventId: event.id,
          title: event.title,
          date: event.date,
          time: event.time,
          venue: event.venue,
          description: event.description,
          eventType: event.eventType,
        });
      }

      // Upload couple photos
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

      if (brideBlob || groomBlob) {
        await addPhotos.mutateAsync({
          invitationId: invitation.id,
          bridePhoto: brideBlob,
          groomPhoto: groomBlob,
        });
      }

      // Add gallery photos
      for (let i = 0; i < formData.photos.length; i++) {
        await addPhoto.mutateAsync({
          invitationId: invitation.id,
          photoId: `${invitation.id}-photo-${i}-${Date.now()}`,
          imageUrl: formData.photos[i],
        });
      }

      // Set background music
      if (formData.musicUrl) {
        await setBackgroundMusic.mutateAsync({
          invitationId: invitation.id,
          musicId: `${invitation.id}-music-${Date.now()}`,
          musicUrl: formData.musicUrl,
          autoPlay: formData.musicAutoPlay,
        });
      }

      resetForm();
      navigate({ to: '/dashboard' });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory-50 dark:bg-charcoal-900 pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8 pt-8">
          <h1 className="text-3xl md:text-4xl font-serif text-charcoal-800 dark:text-ivory-100 mb-2">
            Create Your Invitation
          </h1>
          <p className="text-charcoal-500 dark:text-ivory-400 font-sans">
            Step {currentStep} of {STEPS.length}: {STEPS[currentStep - 1].description}
          </p>
        </div>

        <ProgressBar currentStep={currentStep} totalSteps={STEPS.length} steps={STEPS} />

        <div className="mt-8">
          {currentStep === 1 && <CoupleDetailsStep onNext={handleNext} />}
          {currentStep === 2 && <EventManagementStep onNext={handleNext} onBack={handleBack} />}
          {currentStep === 3 && <TemplateThemeStep onNext={handleNext} onBack={handleBack} />}
          {currentStep === 4 && <MediaManagementStep onNext={handleNext} onBack={handleBack} />}
          {currentStep === 5 && (
            <ReviewStep
              onBack={handleBack}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              submitError={submitError}
            />
          )}
        </div>

        {isSubmitting && (
          <div className="fixed inset-0 bg-charcoal-900/50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-charcoal-800 rounded-2xl p-8 text-center shadow-2xl">
              <Loader2 className="w-12 h-12 animate-spin text-gold-500 mx-auto mb-4" />
              <p className="text-charcoal-700 dark:text-ivory-200 font-serif text-lg">Creating your invitation...</p>
              <p className="text-charcoal-500 dark:text-ivory-400 text-sm mt-2">This may take a moment</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
