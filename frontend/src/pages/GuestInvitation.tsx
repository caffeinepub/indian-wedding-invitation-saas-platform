import { useParams } from '@tanstack/react-router';
import {
  useGetInvitationBySlug,
  useGetEventsByInvitation,
  useGetPhotosByInvitation,
  useGetBackgroundMusic,
} from '../hooks/useQueries';
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
import { Heart, Lock, AlertTriangle, RefreshCw, Loader2 } from 'lucide-react';

export default function GuestInvitation() {
  const { slug } = useParams({ from: '/invitation/$slug' });

  const { data: invitation, isLoading: invLoading, error: invError, refetch, isFetching } = useGetInvitationBySlug(slug);
  const { data: events } = useGetEventsByInvitation(slug);
  const { data: photos } = useGetPhotosByInvitation(slug);
  const { data: musicList } = useGetBackgroundMusic(slug);

  const music = musicList?.[0];

  if (invLoading) {
    return (
      <div className="min-h-screen pt-20 px-4" style={{ backgroundColor: 'oklch(0.98 0.005 80)' }}>
        <div className="max-w-4xl mx-auto space-y-6">
          <SkeletonLoader variant="image" />
          <SkeletonLoader variant="text" />
          <SkeletonLoader variant="card" />
        </div>
      </div>
    );
  }

  if (invError) {
    const isUnavailable = invError.message.includes('temporarily unavailable');
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'oklch(0.98 0.005 80)' }}>
        <div className="text-center px-4 max-w-sm mx-auto">
          {isUnavailable ? (
            <AlertTriangle className="w-16 h-16 mx-auto mb-4" style={{ color: 'oklch(0.72 0.12 75)' }} />
          ) : (
            <Heart className="w-16 h-16 mx-auto mb-4" style={{ color: 'oklch(0.72 0.12 75)' }} />
          )}
          <h2 className="text-2xl font-semibold mb-2" style={{ color: 'oklch(0.18 0.02 60)', fontFamily: '"Playfair Display", serif' }}>
            {isUnavailable ? 'Service Unavailable' : 'Invitation Not Found'}
          </h2>
          <p className="mb-6" style={{ color: 'oklch(0.50 0.04 60)' }}>
            {isUnavailable
              ? 'This invitation is temporarily unavailable. Please try again shortly.'
              : 'This invitation may have been removed or the link is incorrect.'}
          </p>
          {isUnavailable && (
            <button
              onClick={() => refetch()}
              disabled={isFetching}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all mx-auto disabled:opacity-50"
              style={{ backgroundColor: 'oklch(0.55 0.18 45)', color: 'oklch(0.99 0.003 80)' }}
            >
              {isFetching ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4" />
              )}
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!invitation) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'oklch(0.98 0.005 80)' }}>
        <div className="text-center px-4">
          <Heart className="w-16 h-16 mx-auto mb-4" style={{ color: 'oklch(0.72 0.12 75)' }} />
          <h2 className="text-2xl font-semibold mb-2" style={{ color: 'oklch(0.18 0.02 60)', fontFamily: '"Playfair Display", serif' }}>
            Invitation Not Found
          </h2>
          <p style={{ color: 'oklch(0.50 0.04 60)' }}>
            This invitation may have been removed or the link is incorrect.
          </p>
        </div>
      </div>
    );
  }

  if (!invitation.isPublished) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'oklch(0.98 0.005 80)' }}>
        <div className="text-center px-4">
          <Lock className="w-16 h-16 mx-auto mb-4" style={{ color: 'oklch(0.72 0.12 75)' }} />
          <h2 className="text-2xl font-semibold mb-2" style={{ color: 'oklch(0.18 0.02 60)', fontFamily: '"Playfair Display", serif' }}>
            Coming Soon
          </h2>
          <p style={{ color: 'oklch(0.50 0.04 60)' }}>
            This invitation hasn't been published yet. Please check back later.
          </p>
        </div>
      </div>
    );
  }

  const photoUrls = photos?.map(p => p.imageUrl) || [];

  return (
    <div className="min-h-screen">
      {music && (
        <MusicController musicUrl={music.musicUrl} autoPlay={music.autoPlay} />
      )}

      <WhatsAppShareButton
        invitationUrl={`${window.location.origin}/invitation/${slug}`}
        coupleName={`${invitation.brideName} & ${invitation.groomName}`}
      />

      <HeroSection invitation={invitation} />
      <CountdownTimer invitation={invitation} />

      <DecorativeDivider variant="mandala" />

      <CoupleIntroduction invitation={invitation} />

      <DecorativeDivider variant="line" />

      {events && events.length > 0 && (
        <>
          <EventTimeline events={events} invitation={invitation} />
          <DecorativeDivider variant="flourish" />
        </>
      )}

      {photoUrls.length > 0 && (
        <>
          <PhotoGalleryLightbox photos={photoUrls} invitation={invitation} />
          <DecorativeDivider variant="line" />
        </>
      )}

      <VenueSection invitation={invitation} />

      <DecorativeDivider variant="mandala" />

      <RSVPForm invitation={invitation} />

      <footer className="py-8 px-4 text-center" style={{ backgroundColor: 'oklch(0.25 0.02 60)' }}>
        <p className="text-sm" style={{ color: 'oklch(0.72 0.12 75)' }}>
          Built with <Heart className="w-3 h-3 inline fill-current" style={{ color: 'oklch(0.55 0.20 25)' }} /> using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:opacity-80 transition-opacity"
            style={{ color: 'oklch(0.82 0.09 78)' }}
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
