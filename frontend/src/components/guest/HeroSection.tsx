import type { Invitation } from '../../backend';
import { ExternalBlob } from '../../backend';
import { getTemplateById } from '../../utils/templateDefinitions';
import { getAnimationClasses } from '../../utils/animations';

interface HeroSectionProps {
  invitation: Invitation;
  animationMode?: 'minimal' | 'elegant' | 'cinematic';
}

export default function HeroSection({ invitation, animationMode = 'elegant' }: HeroSectionProps) {
  const template = getTemplateById(invitation.selectedTemplate);
  const animations = getAnimationClasses(animationMode);

  const bridePhotoUrl = invitation.bridePhoto instanceof ExternalBlob
    ? invitation.bridePhoto.getDirectURL()
    : null;

  const groomPhotoUrl = invitation.groomPhoto instanceof ExternalBlob
    ? invitation.groomPhoto.getDirectURL()
    : null;

  const primaryColor = template?.primaryColor || '#C9A84C';
  const accentColor = template?.accentColor || '#8B1A1A';
  // Script font: TemplateDefinition has no fontScript, use a fixed script font
  const fontScript = 'Great Vibes, cursive';
  const fontHeading = template?.fontHeading || 'Cormorant Garamond, serif';
  const fontBody = template?.fontBody || 'Lato, sans-serif';

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${primaryColor}15 0%, ${accentColor}10 50%, ${primaryColor}20 100%)`,
        backgroundColor: template?.bgColor || '#FDF8F0',
      }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 hero-parallax-bg"
        style={{
          backgroundImage: `url('/assets/generated/hero-bg.dim_1920x1080.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.08,
        }}
      />

      {/* Content */}
      <div className={`relative z-10 text-center px-6 py-16 max-w-4xl mx-auto ${animations.section}`}>
        {/* Script greeting */}
        <p
          className={`text-2xl md:text-3xl mb-4 ${animations.text}`}
          style={{
            fontFamily: fontScript,
            color: accentColor,
          }}
        >
          Together with their families
        </p>

        {/* Couple names */}
        <h1
          className={`text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-6 ${animations.heading}`}
          style={{
            fontFamily: fontHeading,
            color: primaryColor,
          }}
        >
          {invitation.brideName}
          <span
            className="block text-3xl md:text-4xl my-2"
            style={{
              fontFamily: fontScript,
              color: accentColor,
            }}
          >
            &amp;
          </span>
          {invitation.groomName}
        </h1>

        {/* Photos */}
        {(bridePhotoUrl || groomPhotoUrl) && (
          <div className={`flex items-center justify-center gap-8 my-8 ${animations.image}`}>
            {bridePhotoUrl && (
              <div
                className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 shadow-luxury"
                style={{ borderColor: primaryColor }}
              >
                <img
                  src={bridePhotoUrl}
                  alt={invitation.brideName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {bridePhotoUrl && groomPhotoUrl && (
              <div
                className="text-4xl"
                style={{
                  fontFamily: fontScript,
                  color: accentColor,
                }}
              >
                ♥
              </div>
            )}
            {groomPhotoUrl && (
              <div
                className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 shadow-luxury"
                style={{ borderColor: primaryColor }}
              >
                <img
                  src={groomPhotoUrl}
                  alt={invitation.groomName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        )}

        {/* Wedding date */}
        <div className={`mt-6 ${animations.text}`}>
          <p
            className="text-lg md:text-xl tracking-widest uppercase mb-1"
            style={{
              fontFamily: fontBody,
              color: accentColor,
              opacity: 0.8,
            }}
          >
            {invitation.weddingDate
              ? new Date(invitation.weddingDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Date to be announced'}
          </p>
          {invitation.weddingTime && (
            <p
              className="text-base tracking-widest"
              style={{
                fontFamily: fontBody,
                color: primaryColor,
              }}
            >
              {invitation.weddingTime}
            </p>
          )}
        </div>

        {/* Venue */}
        {invitation.venueName && (
          <div className={`mt-4 ${animations.text}`}>
            <p
              className="text-xl md:text-2xl font-medium"
              style={{
                fontFamily: fontHeading,
                color: primaryColor,
              }}
            >
              {invitation.venueName}
            </p>
            {invitation.venueAddress && (
              <p
                className="text-sm mt-1 opacity-70"
                style={{
                  fontFamily: fontBody,
                  color: accentColor,
                }}
              >
                {invitation.venueAddress}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Decorative divider */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center">
        <img
          src="/assets/generated/mandala-divider.dim_1200x120.png"
          alt=""
          className="w-64 opacity-30"
        />
      </div>
    </section>
  );
}
