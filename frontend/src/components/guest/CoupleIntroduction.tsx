import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { getTemplateById } from '../../utils/templateDefinitions';
import type { Invitation } from '../../backend';
import { ExternalBlob } from '../../backend';

interface CoupleIntroductionProps {
  invitation: Invitation;
  animationMode?: 'minimal' | 'elegant' | 'cinematic';
}

export default function CoupleIntroduction({ invitation, animationMode = 'elegant' }: CoupleIntroductionProps) {
  const template = getTemplateById(invitation.selectedTemplate);
  const { ref: sectionRef, isVisible } = useScrollAnimation({ threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  const bridePhotoUrl = invitation.bridePhoto instanceof ExternalBlob
    ? invitation.bridePhoto.getDirectURL()
    : null;

  const groomPhotoUrl = invitation.groomPhoto instanceof ExternalBlob
    ? invitation.groomPhoto.getDirectURL()
    : null;

  const primaryColor = template?.primaryColor || '#C9A84C';
  const accentColor = template?.accentColor || '#8B1A1A';
  const bgColor = template?.bgColor || '#FDF8F0';
  // Script font: TemplateDefinition has no fontScript field
  const fontScript = 'Great Vibes, cursive';
  const fontHeading = template?.fontHeading || 'Cormorant Garamond, serif';
  const fontBody = template?.fontBody || 'Lato, sans-serif';

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className={`py-16 px-6 scroll-animate ${isVisible ? 'is-visible' : ''}`}
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Section heading */}
        <div className="text-center mb-12">
          <p
            className="text-2xl md:text-3xl mb-2"
            style={{
              fontFamily: fontScript,
              color: accentColor,
            }}
          >
            About the Couple
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold"
            style={{
              fontFamily: fontHeading,
              color: primaryColor,
            }}
          >
            {invitation.brideName} &amp; {invitation.groomName}
          </h2>
          <div
            className="w-24 h-0.5 mx-auto mt-4"
            style={{ background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)` }}
          />
        </div>

        {/* Photos */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          {/* Bride */}
          <div className="flex flex-col items-center text-center">
            {bridePhotoUrl ? (
              <div
                className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 shadow-luxury mb-4"
                style={{ borderColor: primaryColor }}
              >
                <img
                  src={bridePhotoUrl}
                  alt={invitation.brideName}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div
                className="w-40 h-40 md:w-48 md:h-48 rounded-full flex items-center justify-center border-4 shadow-luxury mb-4 text-5xl font-bold"
                style={{
                  borderColor: primaryColor,
                  backgroundColor: `${primaryColor}20`,
                  color: primaryColor,
                  fontFamily: fontHeading,
                }}
              >
                {invitation.brideName.charAt(0)}
              </div>
            )}
            <h3
              className="text-2xl font-bold"
              style={{
                fontFamily: fontHeading,
                color: primaryColor,
              }}
            >
              {invitation.brideName}
            </h3>
            <p
              className="text-sm mt-1 opacity-70"
              style={{
                fontFamily: fontBody,
                color: accentColor,
              }}
            >
              The Bride
            </p>
          </div>

          {/* Heart divider */}
          <div
            className="text-5xl animate-floatGentle"
            style={{ color: accentColor }}
          >
            ♥
          </div>

          {/* Groom */}
          <div className="flex flex-col items-center text-center">
            {groomPhotoUrl ? (
              <div
                className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 shadow-luxury mb-4"
                style={{ borderColor: primaryColor }}
              >
                <img
                  src={groomPhotoUrl}
                  alt={invitation.groomName}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div
                className="w-40 h-40 md:w-48 md:h-48 rounded-full flex items-center justify-center border-4 shadow-luxury mb-4 text-5xl font-bold"
                style={{
                  borderColor: primaryColor,
                  backgroundColor: `${primaryColor}20`,
                  color: primaryColor,
                  fontFamily: fontHeading,
                }}
              >
                {invitation.groomName.charAt(0)}
              </div>
            )}
            <h3
              className="text-2xl font-bold"
              style={{
                fontFamily: fontHeading,
                color: primaryColor,
              }}
            >
              {invitation.groomName}
            </h3>
            <p
              className="text-sm mt-1 opacity-70"
              style={{
                fontFamily: fontBody,
                color: accentColor,
              }}
            >
              The Groom
            </p>
          </div>
        </div>

        {/* Family details */}
        {invitation.familyDetails && (
          <div className="mt-12 text-center max-w-2xl mx-auto">
            <p
              className="text-base md:text-lg leading-relaxed opacity-80"
              style={{
                fontFamily: fontBody,
                color: accentColor,
              }}
            >
              {invitation.familyDetails}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
