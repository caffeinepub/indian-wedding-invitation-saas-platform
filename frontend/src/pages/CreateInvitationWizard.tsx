import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ChevronLeft, ChevronRight, Check, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { InvitationFormProvider, useInvitationForm } from '../context/InvitationFormContext';
import CoupleDetailsStep from '../components/wizard/CoupleDetailsStep';
import EventManagementStep from '../components/wizard/EventManagementStep';
import TemplateThemeStep from '../components/wizard/TemplateThemeStep';
import MediaManagementStep from '../components/wizard/MediaManagementStep';
import ReviewStep from '../components/wizard/ReviewStep';
import { useCreateInvitation, useAddPhotos, useCreateEvent } from '../hooks/useQueries';
import { ExternalBlob } from '../backend';

const STEPS = [
  { id: 1, title: 'Couple Details', description: 'Names, photos & basic info' },
  { id: 2, title: 'Events', description: 'Wedding ceremonies & events' },
  { id: 3, title: 'Theme & Design', description: 'Templates, colors & fonts' },
  { id: 4, title: 'Media', description: 'Photos & background music' },
  { id: 5, title: 'Review', description: 'Review & publish' },
];

function WizardContent() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { formData } = useInvitationForm();
  const createInvitation = useCreateInvitation();
  const addPhotos = useAddPhotos();
  const createEvent = useCreateEvent();

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

  const generateSlug = () => {
    const base = `${formData.brideName}-${formData.groomName}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
    return `${base}-${Date.now()}`;
  };

  const handleSubmit = async () => {
    if (!formData.brideName || !formData.groomName) {
      toast.error('Please fill in bride and groom names before submitting.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const slug = generateSlug();

      const invitation = await createInvitation.mutateAsync({
        slug,
        brideName: formData.brideName,
        groomName: formData.groomName,
        weddingDate: formData.weddingDate,
        weddingTime: formData.weddingTime,
        venueName: formData.venueName,
        venueAddress: formData.venueAddress,
        googleMapsLink: formData.googleMapsLink || '',
        familyDetails: formData.familyDetails || '',
        invitationMessage: formData.invitationMessage || '',
        selectedTemplate: formData.selectedTemplate || 'classic-ivory',
        colorScheme: formData.colorScheme || 'ivory-gold',
        fontChoice: formData.fontChoice || 'playfair-lato',
        backgroundChoice: formData.backgroundChoice || 'solid',
      });

      // Upload photos if provided
      if (formData.bridePhoto || formData.groomPhoto) {
        try {
          const brideBlob = formData.bridePhoto
            ? ExternalBlob.fromBytes(new Uint8Array(await formData.bridePhoto.arrayBuffer()))
            : null;
          const groomBlob = formData.groomPhoto
            ? ExternalBlob.fromBytes(new Uint8Array(await formData.groomPhoto.arrayBuffer()))
            : null;
          await addPhotos.mutateAsync({
            invitationId: invitation.id,
            bridePhoto: brideBlob,
            groomPhoto: groomBlob,
          });
        } catch (photoError) {
          console.warn('Photo upload failed, continuing without photos:', photoError);
        }
      }

      // Create events
      if (formData.events && formData.events.length > 0) {
        for (const event of formData.events) {
          try {
            await createEvent.mutateAsync({
              id: event.id || `event-${Date.now()}-${Math.random()}`,
              invitationId: invitation.id,
              title: event.title,
              date: event.date,
              time: event.time,
              venue: event.venue,
              description: event.description || '',
              eventType: event.eventType || 'custom',
            });
          } catch (eventError) {
            console.warn('Event creation failed:', eventError);
          }
        }
      }

      toast.success('Invitation created successfully!');
      navigate({ to: '/dashboard' });
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Failed to create invitation';
      setSubmitError(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Determine whether to show the bottom nav (step 3 has its own nav via TemplateThemeStep)
  const showBottomNav = currentStep !== 3;

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'oklch(0.98 0.005 80)' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{ backgroundColor: 'oklch(0.25 0.02 60)', borderColor: 'oklch(0.35 0.025 60)' }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate({ to: '/dashboard' })}
            className="flex items-center gap-2 text-sm font-medium transition-colors"
            style={{ color: 'oklch(0.72 0.12 75)' }}
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <h1
            className="text-lg font-semibold"
            style={{ color: 'oklch(0.98 0.005 80)', fontFamily: '"Playfair Display", serif' }}
          >
            Create Invitation
          </h1>
          <div className="text-sm" style={{ color: 'oklch(0.72 0.12 75)' }}>
            Step {currentStep} of {STEPS.length}
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="border-b" style={{ backgroundColor: 'oklch(0.99 0.003 80)', borderColor: 'oklch(0.88 0.02 80)' }}>
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between overflow-x-auto gap-2">
            {STEPS.map((step, index) => (
              <div key={step.id} className="flex items-center gap-2 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all"
                    style={{
                      backgroundColor: currentStep > step.id
                        ? 'oklch(0.55 0.18 45)'
                        : currentStep === step.id
                        ? 'oklch(0.72 0.12 75)'
                        : 'oklch(0.88 0.02 80)',
                      color: currentStep >= step.id
                        ? 'oklch(0.99 0.003 80)'
                        : 'oklch(0.50 0.04 60)',
                    }}
                  >
                    {currentStep > step.id ? <Check className="w-4 h-4" /> : step.id}
                  </div>
                  <div className="hidden sm:block">
                    <div
                      className="text-xs font-medium"
                      style={{ color: currentStep === step.id ? 'oklch(0.55 0.18 45)' : 'oklch(0.40 0.03 60)' }}
                    >
                      {step.title}
                    </div>
                    <div className="text-xs" style={{ color: 'oklch(0.50 0.04 60)' }}>
                      {step.description}
                    </div>
                  </div>
                </div>
                {index < STEPS.length - 1 && (
                  <div
                    className="w-8 h-0.5 hidden sm:block"
                    style={{ backgroundColor: currentStep > step.id ? 'oklch(0.55 0.18 45)' : 'oklch(0.88 0.02 80)' }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div
          className="rounded-2xl border shadow-card overflow-hidden"
          style={{ backgroundColor: 'oklch(0.99 0.003 80)', borderColor: 'oklch(0.88 0.02 80)' }}
        >
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

        {/* Navigation Buttons — only shown for steps that don't have their own nav */}
        {showBottomNav && currentStep !== 5 && (
          <div className="flex items-center justify-between mt-6">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center gap-2"
              style={{ borderColor: 'oklch(0.88 0.02 80)', color: 'oklch(0.40 0.03 60)' }}
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              className="flex items-center gap-2"
              style={{ backgroundColor: 'oklch(0.55 0.18 45)', color: 'oklch(0.99 0.003 80)' }}
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </main>

      {/* Full-screen submitting overlay */}
      {isSubmitting && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ backgroundColor: 'oklch(0.18 0.02 60 / 0.7)' }}>
          <div
            className="rounded-2xl p-8 text-center shadow-2xl border"
            style={{ backgroundColor: 'oklch(0.99 0.003 80)', borderColor: 'oklch(0.88 0.02 80)' }}
          >
            <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" style={{ color: 'oklch(0.55 0.18 45)' }} />
            <p className="text-lg font-semibold mb-1" style={{ color: 'oklch(0.18 0.02 60)', fontFamily: '"Playfair Display", serif' }}>
              Creating your invitation...
            </p>
            <p className="text-sm" style={{ color: 'oklch(0.50 0.04 60)' }}>This may take a moment</p>
          </div>
        </div>
      )}
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
