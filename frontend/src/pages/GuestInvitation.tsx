import { useParams } from '@tanstack/react-router';
import { useGetInvitationBySlug, useGetEventsByInvitation, useGetPhotosByInvitation, useGetBackgroundMusic } from '../hooks/useQueries';
import HeroSection from '../components/guest/HeroSection';
import CoupleIntroduction from '../components/guest/CoupleIntroduction';
import EventTimeline from '../components/guest/EventTimeline';
import PhotoGalleryLightbox from '../components/guest/PhotoGalleryLightbox';
import RSVPForm from '../components/guest/RSVPForm';
import VenueSection from '../components/guest/VenueSection';
import CountdownTimer from '../components/guest/CountdownTimer';
import WhatsAppShareButton from '../components/guest/WhatsAppShareButton';
import MusicController from '../components/media/MusicController';
import DecorativeDivider from '../components/layout/DecorativeDivider';
import SkeletonLoader from '../components/SkeletonLoader';
import { Heart, Lock } from 'lucide-react';

export default function GuestInvitation() {
  const { slug } = useParams({ from: '/invitation/$slug' });

  const { data: invitation, isLoading: invLoading, error: invError } = useGetInvitationBySlug(slug);
  const { data: events } = useGetEventsByInvitation(slug);
  const { data: photos } = useGetPhotosByInvitation(slug);
  const { data: musicList } = useGetBackgroundMusic(slug);

  const music = musicList?.[0];

  if (invLoading) {
    return (
      <div className="min-h-screen bg-ivory-50 pt-20 px-4">
        <div className="max-w-4xl mx-auto space-y-6">
          <SkeletonLoader variant="image" />
          <SkeletonLoader variant="text" />
          <SkeletonLoader variant="card" />
        </div>
      </div>
    );
  }

  if (invError || !invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory-50">
        <div className="text-center px-4">
          <Heart className="w-16 h-16 text-gold-300 mx-auto mb-4" />
          <h2 className="text-2xl font-serif text-charcoal-700 mb-2">Invitation Not Found</h2>
          <p className="text-charcoal-500 font-sans">This invitation may have been removed or the link is incorrect.</p>
        </div>
      </div>
    );
  }

  if (!invitation.isPublished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory-50">
        <div className="text-center px-4">
          <Lock className="w-16 h-16 text-gold-300 mx-auto mb-4" />
          <h2 className="text-2xl font-serif text-charcoal-700 mb-2">Coming Soon</h2>
          <p className="text-charcoal-500 font-sans">This invitation hasn't been published yet. Please check back later.</p>
        </div>
      </div>
    );
  }

  const photoUrls = photos?.map(p => p.imageUrl) || [];

  return (
    <div className="min-h-screen">
      {/* Music Controller */}
      {music && (
        <MusicController
          musicUrl={music.musicUrl}
          autoPlay={music.autoPlay}
        />
      )}

      {/* WhatsApp Share */}
      <WhatsAppShareButton
        invitationUrl={`${window.location.origin}/invitation/${slug}`}
        coupleName={`${invitation.brideName} & ${invitation.groomName}`}
      />

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
      {photoUrls.length > 0 && (
        <>
          <PhotoGalleryLightbox photos={photoUrls} invitation={invitation} />
          <DecorativeDivider variant="line" />
        </>
      )}

      {/* Venue */}
      <VenueSection invitation={invitation} />

      <DecorativeDivider variant="mandala" />

      {/* RSVP */}
      <RSVPForm invitation={invitation} />

      {/* Footer */}
      <footer className="py-8 px-4 bg-charcoal-900 text-center">
        <p className="text-ivory-400 text-sm font-sans">
          Built with <Heart className="w-3 h-3 inline text-crimson-400 fill-current" /> using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold-400 hover:text-gold-300 transition-colors"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
