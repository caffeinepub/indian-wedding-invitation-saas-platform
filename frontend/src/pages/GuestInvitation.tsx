import React from 'react';
import { useParams } from '@tanstack/react-router';
import { Heart } from 'lucide-react';
import {
  useGetInvitationBySlug,
  useGetEvents,
  useGetPhotos,
  useGetBackgroundMusic,
} from '@/hooks/useQueries';
import { getTemplateById } from '@/utils/templateDefinitions';
import HeroSection from '@/components/guest/HeroSection';
import CountdownTimer from '@/components/guest/CountdownTimer';
import CoupleIntroduction from '@/components/guest/CoupleIntroduction';
import EventTimeline from '@/components/guest/EventTimeline';
import PhotoGalleryLightbox from '@/components/guest/PhotoGalleryLightbox';
import VenueSection from '@/components/guest/VenueSection';
import RSVPForm from '@/components/guest/RSVPForm';
import WhatsAppShareButton from '@/components/guest/WhatsAppShareButton';
import MusicController from '@/components/media/MusicController';
import DecorativeDivider from '@/components/layout/DecorativeDivider';
import NotFound from './NotFound';

export default function GuestInvitation() {
  const { slug } = useParams({ from: '/$slug' });
  const { data: invitation, isLoading: invLoading } = useGetInvitationBySlug(slug);
  const { data: events = [], isLoading: eventsLoading } = useGetEvents(slug);
  const { data: photos = [], isLoading: photosLoading } = useGetPhotos(slug);
  const { data: musicList = [] } = useGetBackgroundMusic(slug);

  const isLoading = invLoading || eventsLoading || photosLoading;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ivory flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto animate-float">
            <Heart className="w-8 h-8 text-gold" />
          </div>
          <p className="font-cinzel text-lg text-gold-dark">Loading Invitation...</p>
        </div>
      </div>
    );
  }

  if (!invitation) {
    return <NotFound />;
  }

  if (!invitation.isPublished) {
    const template = getTemplateById(invitation.selectedTemplate);
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4 text-center"
        style={{ background: template.bgColor }}
      >
        <div>
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 animate-float"
            style={{ background: `${template.primaryColor}20` }}
          >
            <Heart className="w-10 h-10" style={{ color: template.primaryColor }} />
          </div>
          <h1
            className="font-cinzel text-3xl font-bold mb-3"
            style={{ fontFamily: template.headingFont, color: template.textColor }}
          >
            Coming Soon
          </h1>
          <p className="font-inter text-sm" style={{ color: template.textColor, opacity: 0.6 }}>
            This invitation hasn't been published yet. Check back soon!
          </p>
        </div>
      </div>
    );
  }

  const template = getTemplateById(invitation.selectedTemplate);
  const latestMusic = musicList.length > 0 ? musicList[musicList.length - 1] : null;
  const couplePhoto = photos.find((p) => p.id.startsWith('couple-')) || null;

  return (
    <div style={{ background: template.bgColor, minHeight: '100vh' }}>
      {/* Hero */}
      <HeroSection invitation={invitation} couplePhotoUrl={couplePhoto?.imageUrl} />

      {/* Mandala Divider */}
      <div style={{ background: template.bgColor }}>
        <DecorativeDivider variant="mandala" />
      </div>

      {/* Countdown */}
      {invitation.weddingDate && <CountdownTimer invitation={invitation} />}

      {/* Couple Introduction */}
      <CoupleIntroduction invitation={invitation} />

      {/* Mandala Divider */}
      <div style={{ background: template.bgColor }}>
        <DecorativeDivider variant="mandala" />
      </div>

      {/* Events */}
      {events.length > 0 && <EventTimeline events={events} invitation={invitation} />}

      {/* Gallery */}
      {photos.length > 0 && <PhotoGalleryLightbox photos={photos} invitation={invitation} />}

      {/* Mandala Divider */}
      <div style={{ background: template.bgColor }}>
        <DecorativeDivider variant="mandala" />
      </div>

      {/* Venue */}
      <VenueSection invitation={invitation} />

      {/* RSVP */}
      <RSVPForm invitation={invitation} />

      {/* Footer */}
      <footer
        className="py-10 px-4 text-center border-t"
        style={{ background: template.bgColor, borderColor: `${template.primaryColor}20` }}
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-px" style={{ background: `${template.primaryColor}40` }} />
          <span style={{ color: template.primaryColor }}>✦</span>
          <div className="w-12 h-px" style={{ background: `${template.primaryColor}40` }} />
        </div>
        <p
          className="font-cinzel text-lg font-bold mb-1"
          style={{ fontFamily: template.headingFont, color: template.primaryColor }}
        >
          {invitation.brideName} & {invitation.groomName}
        </p>
        <p className="font-inter text-xs mt-4" style={{ color: template.textColor, opacity: 0.4 }}>
          Built with <Heart className="w-3 h-3 inline text-crimson fill-crimson" /> using{' '}
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== 'undefined' ? window.location.hostname : 'vivah-wedding'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>

      {/* Floating buttons */}
      <WhatsAppShareButton
        slug={slug}
        brideName={invitation.brideName}
        groomName={invitation.groomName}
      />
      {latestMusic && (
        <MusicController musicUrl={latestMusic.musicUrl} autoPlay={latestMusic.autoPlay} />
      )}
    </div>
  );
}
