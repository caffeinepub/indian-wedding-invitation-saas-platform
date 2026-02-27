import { useState, useEffect } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Save, Eye, ArrowLeft, Loader2, AlertTriangle, RefreshCw } from 'lucide-react';
import { useGetInvitationBySlug, useUpdateInvitation } from '../hooks/useQueries';
import { InvitationFormProvider, useInvitationForm } from '../context/InvitationFormContext';
import TemplatePreview from '../components/templates/TemplatePreview';
import TemplateThemeStep from '../components/wizard/TemplateThemeStep';
import EventManagementStep from '../components/wizard/EventManagementStep';
import MediaManagementStep from '../components/wizard/MediaManagementStep';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

function EditorContent({ invitationId }: { invitationId: string }) {
  const navigate = useNavigate();
  const { formData, updateFormData } = useInvitationForm();
  const updateInvitation = useUpdateInvitation();
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError(null);
    try {
      await updateInvitation.mutateAsync({
        slug: invitationId,
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
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Failed to save. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePreview = () => {
    window.open(`/invitation/${invitationId}`, '_blank');
  };

  return (
    <div className="flex flex-col h-screen" style={{ backgroundColor: 'oklch(0.15 0.01 60)' }}>
      {/* Editor Toolbar */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b shrink-0 z-40"
        style={{ backgroundColor: 'oklch(0.18 0.015 60)', borderColor: 'oklch(0.28 0.02 60)' }}
      >
        <button
          onClick={() => navigate({ to: '/dashboard' })}
          className="flex items-center gap-2 text-sm font-medium transition-colors"
          style={{ color: 'oklch(0.72 0.12 75)' }}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          {saveSuccess && (
            <span className="text-sm font-medium" style={{ color: 'oklch(0.65 0.15 145)' }}>Saved!</span>
          )}
          {saveError && (
            <span className="text-xs font-medium max-w-[200px] truncate" style={{ color: 'oklch(0.72 0.12 75)' }} title={saveError}>
              {saveError}
            </span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreview}
            className="gap-1.5"
            style={{ borderColor: 'oklch(0.35 0.025 60)', color: 'oklch(0.82 0.09 78)', backgroundColor: 'transparent' }}
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Preview</span>
          </Button>
          <Button
            size="sm"
            onClick={handleSave}
            disabled={isSaving}
            className="gap-1.5 font-semibold"
            style={{ backgroundColor: 'oklch(0.72 0.12 75)', color: 'oklch(0.18 0.02 60)' }}
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            <span className="hidden sm:inline">{isSaving ? 'Saving...' : 'Save'}</span>
          </Button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Panel — Controls */}
        <div
          className="w-full md:w-[420px] lg:w-[480px] shrink-0 border-r flex flex-col overflow-hidden"
          style={{ backgroundColor: 'oklch(0.18 0.015 60)', borderColor: 'oklch(0.28 0.02 60)' }}
        >
          <Tabs defaultValue="details" className="flex flex-col h-full">
            <TabsList
              className="shrink-0 grid grid-cols-4 m-3"
              style={{ backgroundColor: 'oklch(0.22 0.02 60)' }}
            >
              <TabsTrigger value="details" className="text-xs data-[state=active]:bg-gold-500 data-[state=active]:text-charcoal-900">Details</TabsTrigger>
              <TabsTrigger value="theme" className="text-xs data-[state=active]:bg-gold-500 data-[state=active]:text-charcoal-900">Theme</TabsTrigger>
              <TabsTrigger value="events" className="text-xs data-[state=active]:bg-gold-500 data-[state=active]:text-charcoal-900">Events</TabsTrigger>
              <TabsTrigger value="media" className="text-xs data-[state=active]:bg-gold-500 data-[state=active]:text-charcoal-900">Media</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="flex-1 overflow-hidden m-0">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-4">
                  <DetailsForm />
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="theme" className="flex-1 overflow-hidden m-0">
              <ScrollArea className="h-full">
                <TemplateThemeStep onNext={() => {}} onBack={() => {}} hideNavigation />
              </ScrollArea>
            </TabsContent>

            <TabsContent value="events" className="flex-1 overflow-hidden m-0">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <EventManagementStep onNext={() => {}} onBack={() => {}} hideNavigation />
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="media" className="flex-1 overflow-hidden m-0">
              <ScrollArea className="h-full">
                <div className="p-4">
                  <MediaManagementStep onNext={() => {}} onBack={() => {}} hideNavigation />
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        {/* Right Panel — Preview */}
        <div className="hidden md:flex flex-1 overflow-hidden" style={{ backgroundColor: 'oklch(0.22 0.02 60)' }}>
          <ScrollArea className="w-full h-full">
            <div className="p-6 flex justify-center">
              <div className="w-full max-w-md">
                <TemplatePreview />
              </div>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
}

function DetailsForm() {
  const { formData, updateFormData } = useInvitationForm();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs" style={{ color: 'oklch(0.65 0.04 60)' }}>Bride's Name</Label>
          <Input
            value={formData.brideName}
            onChange={(e) => updateFormData({ brideName: e.target.value })}
            placeholder="Bride's name"
            className="text-sm"
            style={{ backgroundColor: 'oklch(0.22 0.02 60)', borderColor: 'oklch(0.35 0.025 60)', color: 'oklch(0.95 0.005 80)' }}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs" style={{ color: 'oklch(0.65 0.04 60)' }}>Groom's Name</Label>
          <Input
            value={formData.groomName}
            onChange={(e) => updateFormData({ groomName: e.target.value })}
            placeholder="Groom's name"
            className="text-sm"
            style={{ backgroundColor: 'oklch(0.22 0.02 60)', borderColor: 'oklch(0.35 0.025 60)', color: 'oklch(0.95 0.005 80)' }}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label className="text-xs" style={{ color: 'oklch(0.65 0.04 60)' }}>Wedding Date</Label>
          <Input
            type="date"
            value={formData.weddingDate}
            onChange={(e) => updateFormData({ weddingDate: e.target.value })}
            className="text-sm"
            style={{ backgroundColor: 'oklch(0.22 0.02 60)', borderColor: 'oklch(0.35 0.025 60)', color: 'oklch(0.95 0.005 80)' }}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-xs" style={{ color: 'oklch(0.65 0.04 60)' }}>Wedding Time</Label>
          <Input
            type="time"
            value={formData.weddingTime}
            onChange={(e) => updateFormData({ weddingTime: e.target.value })}
            className="text-sm"
            style={{ backgroundColor: 'oklch(0.22 0.02 60)', borderColor: 'oklch(0.35 0.025 60)', color: 'oklch(0.95 0.005 80)' }}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs" style={{ color: 'oklch(0.65 0.04 60)' }}>Venue Name</Label>
        <Input
          value={formData.venueName}
          onChange={(e) => updateFormData({ venueName: e.target.value })}
          placeholder="Venue name"
          className="text-sm"
          style={{ backgroundColor: 'oklch(0.22 0.02 60)', borderColor: 'oklch(0.35 0.025 60)', color: 'oklch(0.95 0.005 80)' }}
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs" style={{ color: 'oklch(0.65 0.04 60)' }}>Venue Address</Label>
        <Input
          value={formData.venueAddress}
          onChange={(e) => updateFormData({ venueAddress: e.target.value })}
          placeholder="Full address"
          className="text-sm"
          style={{ backgroundColor: 'oklch(0.22 0.02 60)', borderColor: 'oklch(0.35 0.025 60)', color: 'oklch(0.95 0.005 80)' }}
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs" style={{ color: 'oklch(0.65 0.04 60)' }}>Google Maps Link</Label>
        <Input
          value={formData.googleMapsLink}
          onChange={(e) => updateFormData({ googleMapsLink: e.target.value })}
          placeholder="https://maps.google.com/..."
          className="text-sm"
          style={{ backgroundColor: 'oklch(0.22 0.02 60)', borderColor: 'oklch(0.35 0.025 60)', color: 'oklch(0.95 0.005 80)' }}
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs" style={{ color: 'oklch(0.65 0.04 60)' }}>Family Details</Label>
        <Textarea
          value={formData.familyDetails}
          onChange={(e) => updateFormData({ familyDetails: e.target.value })}
          placeholder="Family details..."
          rows={3}
          className="text-sm resize-none"
          style={{ backgroundColor: 'oklch(0.22 0.02 60)', borderColor: 'oklch(0.35 0.025 60)', color: 'oklch(0.95 0.005 80)' }}
        />
      </div>

      <div className="space-y-1.5">
        <Label className="text-xs" style={{ color: 'oklch(0.65 0.04 60)' }}>Invitation Message</Label>
        <Textarea
          value={formData.invitationMessage}
          onChange={(e) => updateFormData({ invitationMessage: e.target.value })}
          placeholder="Your invitation message..."
          rows={4}
          className="text-sm resize-none"
          style={{ backgroundColor: 'oklch(0.22 0.02 60)', borderColor: 'oklch(0.35 0.025 60)', color: 'oklch(0.95 0.005 80)' }}
        />
      </div>
    </div>
  );
}

function EditorLoader({ invitationId }: { invitationId: string }) {
  const { data: invitation, isLoading, error, refetch, isFetching } = useGetInvitationBySlug(invitationId);
  const navigate = useNavigate();
  const { updateFormData } = useInvitationForm();

  useEffect(() => {
    if (invitation) {
      updateFormData({
        brideName: invitation.brideName,
        groomName: invitation.groomName,
        weddingDate: invitation.weddingDate,
        weddingTime: invitation.weddingTime,
        venueName: invitation.venueName,
        venueAddress: invitation.venueAddress,
        googleMapsLink: invitation.googleMapsLink,
        familyDetails: invitation.familyDetails,
        invitationMessage: invitation.invitationMessage,
        selectedTemplate: invitation.selectedTemplate,
        colorScheme: invitation.colorScheme,
        fontChoice: invitation.fontChoice,
        backgroundChoice: invitation.backgroundChoice,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invitation]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'oklch(0.15 0.01 60)' }}>
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3" style={{ color: 'oklch(0.72 0.12 75)' }} />
          <p style={{ color: 'oklch(0.65 0.04 60)' }}>Loading invitation...</p>
        </div>
      </div>
    );
  }

  if (error || !invitation) {
    const isUnavailable = error?.message?.includes('temporarily unavailable');
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'oklch(0.15 0.01 60)' }}>
        <div className="text-center max-w-sm mx-auto px-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: 'oklch(0.22 0.02 60)' }}
          >
            <AlertTriangle className="w-8 h-8" style={{ color: 'oklch(0.72 0.12 75)' }} />
          </div>
          <p className="text-lg mb-2" style={{ color: 'oklch(0.95 0.005 80)', fontFamily: '"Playfair Display", serif' }}>
            {isUnavailable ? 'Service Unavailable' : 'Invitation Not Found'}
          </p>
          <p className="text-sm mb-6" style={{ color: 'oklch(0.65 0.04 60)' }}>
            {error?.message || 'Could not load this invitation.'}
          </p>
          <div className="flex gap-3 justify-center">
            {isUnavailable && (
              <Button
                onClick={() => refetch()}
                disabled={isFetching}
                className="gap-1.5 font-semibold"
                style={{ backgroundColor: 'oklch(0.72 0.12 75)', color: 'oklch(0.18 0.02 60)' }}
              >
                {isFetching ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <RefreshCw className="w-4 h-4" />
                )}
                Try Again
              </Button>
            )}
            <Button
              onClick={() => navigate({ to: '/dashboard' })}
              variant="outline"
              style={{ borderColor: 'oklch(0.35 0.025 60)', color: 'oklch(0.82 0.09 78)' }}
            >
              Back to Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <EditorContent invitationId={invitationId} />;
}

export default function InvitationEditor() {
  const params = useParams({ from: '/edit/$slug' });
  const invitationId = params.slug;

  return (
    <InvitationFormProvider>
      <EditorLoader invitationId={invitationId} />
    </InvitationFormProvider>
  );
}
