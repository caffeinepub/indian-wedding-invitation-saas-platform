import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from '@tanstack/react-router';
import { Globe, Eye, Loader2, Heart, Copy, Check, ArrowLeft, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  InvitationFormProvider,
  useInvitationForm,
} from '@/context/InvitationFormContext';
import CoupleDetailsStep from '@/components/wizard/CoupleDetailsStep';
import EventManagementStep from '@/components/wizard/EventManagementStep';
import TemplateThemeStep from '@/components/wizard/TemplateThemeStep';
import MediaManagementStep from '@/components/wizard/MediaManagementStep';
import SkeletonLoader from '@/components/SkeletonLoader';
import RSVPResponsesModal from '@/components/dashboard/RSVPResponsesModal';
import {
  useGetInvitationBySlug,
  useUpdateInvitation,
  usePublishInvitation,
  useGetEvents,
  useGetPhotos,
  useGetBackgroundMusic,
} from '@/hooks/useQueries';
import { toast } from 'sonner';
import type { Invitation } from '@/backend';

function PublishModal({
  slug,
  isOpen,
  onClose,
}: {
  slug: string;
  isOpen: boolean;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const url = `${window.location.origin}/${slug}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      `You're invited! View our wedding invitation: ${url}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="luxury-card max-w-md">
        <DialogHeader>
          <DialogTitle className="font-cinzel text-xl text-gold-dark text-center">
            🎉 Invitation Published!
          </DialogTitle>
          <DialogDescription className="font-inter text-center text-muted-foreground">
            Your invitation is now live and shareable
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-2">
          <div className="bg-secondary/50 rounded-xl p-4 border border-gold/20">
            <p className="font-inter text-xs text-muted-foreground mb-1">Your invitation URL</p>
            <p className="font-cinzel text-sm font-bold text-gold-dark break-all">{url}</p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={handleCopy}
              className="btn-gold flex-1 rounded-full font-cinzel tracking-wider"
            >
              {copied ? (
                <Check className="w-4 h-4 mr-2" />
              ) : (
                <Copy className="w-4 h-4 mr-2" />
              )}
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
            <Button
              onClick={handleWhatsApp}
              className="flex-1 rounded-full font-cinzel tracking-wider bg-green-600 hover:bg-green-700 text-white"
            >
              WhatsApp
            </Button>
          </div>
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full rounded-full font-cinzel border-gold/30"
          >
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function EditorContent({
  slug,
  invitation,
}: {
  slug: string;
  invitation: Invitation;
}) {
  const { formData } = useInvitationForm();
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showRSVPModal, setShowRSVPModal] = useState(false);
  const navigate = useNavigate();

  const updateInvitation = useUpdateInvitation();
  const publishInvitation = usePublishInvitation();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateInvitation.mutateAsync({
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
      toast.success('Changes saved successfully');
    } catch {
      toast.error('Failed to save changes');
    } finally {
      setIsSaving(false);
    }
  };

  const handlePublish = async () => {
    setIsPublishing(true);
    try {
      await publishInvitation.mutateAsync(slug);
      setShowPublishModal(true);
    } catch {
      toast.error('Failed to publish invitation');
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-ivory/95 backdrop-blur-md border-b border-gold/20 shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/dashboard">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-muted-foreground hover:text-gold-dark"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="min-w-0">
              <h1 className="font-cinzel text-lg font-bold text-foreground truncate">
                {invitation.brideName} & {invitation.groomName}
              </h1>
              <p className="font-inter text-xs text-muted-foreground">/{slug}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            {/* RSVP Responses Button — always visible */}
            <Button
              size="sm"
              onClick={() => setShowRSVPModal(true)}
              className="rounded-full font-cinzel text-xs tracking-wider border-2 border-gold/40 bg-gradient-to-r from-gold/15 to-crimson/10 text-gold-dark hover:from-gold/25 hover:to-crimson/15 hover:border-gold/60 hidden sm:flex"
              variant="outline"
              style={{ touchAction: 'manipulation' }}
            >
              <Users className="w-3.5 h-3.5 mr-1.5" />
              RSVP Responses
            </Button>

            {invitation.isPublished && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate({ to: '/$slug', params: { slug } })}
                className="rounded-full font-cinzel text-xs border-gold/30 text-gold-dark hover:bg-gold/5 hidden sm:flex"
              >
                <Eye className="w-3.5 h-3.5 mr-1.5" />
                View Live
              </Button>
            )}
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
              variant="outline"
              className="rounded-full font-cinzel text-xs border-gold/30 text-gold-dark hover:bg-gold/5"
            >
              {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : 'Save'}
            </Button>
            {!invitation.isPublished && (
              <Button
                size="sm"
                onClick={handlePublish}
                disabled={isPublishing}
                className="btn-gold rounded-full font-cinzel text-xs tracking-wider"
              >
                {isPublishing ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <>
                    <Globe className="w-3.5 h-3.5 mr-1.5" />
                    Publish
                  </>
                )}
              </Button>
            )}
            {invitation.isPublished && (
              <Button
                size="sm"
                onClick={() => setShowPublishModal(true)}
                className="btn-gold rounded-full font-cinzel text-xs tracking-wider"
              >
                <Globe className="w-3.5 h-3.5 mr-1.5" />
                Share
              </Button>
            )}
          </div>
        </div>

        {/* Mobile RSVP button row */}
        <div className="sm:hidden px-4 pb-3">
          <button
            onClick={() => setShowRSVPModal(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-cinzel text-xs tracking-wider transition-all duration-200 border-2 border-gold/40 bg-gradient-to-r from-gold/15 via-gold/10 to-crimson/10 text-gold-dark hover:from-gold/25 hover:to-crimson/15 hover:border-gold/60"
            style={{ touchAction: 'manipulation' }}
          >
            <Users className="w-3.5 h-3.5" />
            View RSVP Responses
          </button>
        </div>
      </header>

      {/* Tabs */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        <Tabs defaultValue="details">
          <TabsList className="w-full mb-8 bg-secondary/50 rounded-2xl p-1 h-auto flex-wrap gap-1">
            {['details', 'events', 'template', 'media'].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="flex-1 rounded-xl font-cinzel text-xs tracking-wider capitalize data-[state=active]:bg-gold data-[state=active]:text-foreground data-[state=active]:shadow-gold"
              >
                {tab === 'details'
                  ? 'Couple Details'
                  : tab === 'template'
                  ? 'Template'
                  : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="details">
            <CoupleDetailsStep />
          </TabsContent>
          <TabsContent value="events">
            <EventManagementStep />
          </TabsContent>
          <TabsContent value="template">
            <TemplateThemeStep invitationId={slug} />
          </TabsContent>
          <TabsContent value="media">
            <MediaManagementStep />
          </TabsContent>
        </Tabs>
      </main>

      <PublishModal
        slug={slug}
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
      />

      <RSVPResponsesModal
        invitationId={slug}
        invitationTitle={`${invitation.brideName} & ${invitation.groomName}`}
        isOpen={showRSVPModal}
        onClose={() => setShowRSVPModal(false)}
      />
    </div>
  );
}

function EditorLoader({ slug }: { slug: string }) {
  const { data: invitation, isLoading } = useGetInvitationBySlug(slug);
  const { updateFormData } = useInvitationForm();
  const { data: events } = useGetEvents(slug);
  const { data: photos } = useGetPhotos(slug);
  const { data: musicList } = useGetBackgroundMusic(slug);
  const navigate = useNavigate();

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
  }, [invitation]);

  useEffect(() => {
    if (events) {
      updateFormData({
        events: events.map((e) => ({
          id: e.id,
          title: e.title,
          date: e.date,
          time: e.time,
          venue: e.venue,
          description: e.description,
          eventType: e.eventType,
        })),
      });
    }
  }, [events]);

  useEffect(() => {
    if (photos) {
      updateFormData({
        photos: photos.map((p) => ({ id: p.id, imageUrl: p.imageUrl })),
      });
    }
  }, [photos]);

  useEffect(() => {
    if (musicList && musicList.length > 0) {
      const music = musicList[musicList.length - 1];
      updateFormData({ musicUrl: music.musicUrl, musicAutoPlay: music.autoPlay });
    }
  }, [musicList]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ivory pt-24 px-4">
        <div className="max-w-4xl mx-auto">
          <SkeletonLoader variant="card" count={3} />
        </div>
      </div>
    );
  }

  if (!invitation) {
    navigate({ to: '/dashboard' });
    return null;
  }

  return <EditorContent slug={slug} invitation={invitation} />;
}

export default function InvitationEditor() {
  const { slug } = useParams({ from: '/dashboard/$slug' });

  return (
    <InvitationFormProvider>
      <EditorLoader slug={slug} />
    </InvitationFormProvider>
  );
}
