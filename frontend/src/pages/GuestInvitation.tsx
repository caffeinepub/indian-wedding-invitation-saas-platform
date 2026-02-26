import React from 'react';
import { useParams } from '@tanstack/react-router';
import {
  useGetInvitationBySlug,
  useGetEventsByInvitation,
  useGetPhotosByInvitation,
  useGetBackgroundMusic,
} from '../hooks/useQueries';
import HeroSection from '../components/guest/HeroSection';
import CountdownTimer from '../components/guest/CountdownTimer';
import CoupleIntroduction from '../components/guest/CoupleIntroduction';
import EventTimeline from '../components/guest/EventTimeline';
import PhotoGalleryLightbox from '../components/guest/PhotoGalleryLightbox';
import VenueSection from '../components/guest/VenueSection';
import RSVPForm from '../components/guest/RSVPForm';
import WhatsAppShareButton from '../components/guest/WhatsAppShareButton';
import MusicController from '../components/media/MusicController';
import DecorativeDivider from '../components/layout/DecorativeDivider';
import { Loader2 } from 'lucide-react';

export default function GuestInvitation() {
  const params = useParams({ from: '/invitation/$slug' });
  const slug = params.slug;

  const { data: invitation, isLoading, error } = useGetInvitationBySlug(slug);
  const { data: events } = useGetEventsByInvitation(slug);
  const { data: photos } = useGetPhotosByInvitation(slug);
  const { data: musicList } = useGetBackgroundMusic(slug);

  const music = musicList && musicList.length > 0 ? musicList[musicList.length - 1] : null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-gold animate-spin mx-auto mb-4" />
          <p className="font-serif text-charcoal-light text-lg">Loading your invitation...</p>
        </div>
      </div>
    );
  }

  if (error || !invitation) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">💍</div>
          <h2 className="font-display text-3xl text-charcoal mb-4">Invitation Not Found</h2>
          <p className="font-serif text-charcoal-light text-lg">
            This invitation doesn't exist or may have been removed.
          </p>
        </div>
      </div>
    );
  }

  if (!invitation.isPublished) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-6">🔒</div>
          <h2 className="font-display text-3xl text-charcoal mb-4">Not Yet Published</h2>
          <p className="font-serif text-charcoal-light text-lg">
            This invitation hasn't been published yet. Please check back later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <HeroSection invitation={invitation} />

      {/* Countdown */}
      <CountdownTimer invitation={invitation} />

      <DecorativeDivider variant="mandala" />

      {/* Couple Introduction */}
      <CoupleIntroduction invitation={invitation} />

      <DecorativeDivider variant="line" />

      {/* Events */}
      {events && events.length > 0 && (
        <>
          <EventTimeline events={events} invitation={invitation} />
          <DecorativeDivider variant="flourish" />
        </>
      )}

      {/* Photo Gallery */}
      {photos && photos.length > 0 && (
        <>
          <PhotoGalleryLightbox photos={photos} templateData={{
            selectedTemplate: invitation.selectedTemplate,
            colorScheme: invitation.colorScheme,
            fontChoice: invitation.fontChoice,
            backgroundChoice: invitation.backgroundChoice,
          }} />
          <DecorativeDivider variant="line" />
        </>
      )}

      {/* Venue */}
      <VenueSection invitation={invitation} />

      <DecorativeDivider variant="mandala" />

      {/* RSVP */}
      <RSVPForm invitation={invitation} />

      {/* Floating elements */}
      <WhatsAppShareButton
        brideName={invitation.brideName}
        groomName={invitation.groomName}
        slug={slug}
      />

      {music && (
        <MusicController
          musicUrl={music.musicUrl}
          autoPlay={music.autoPlay}
        />
      )}
    </div>
  );
}
