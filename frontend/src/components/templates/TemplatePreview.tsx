import { useInvitationForm } from '../../context/InvitationFormContext';
import { getTemplateById } from '../../utils/templateDefinitions';
import { PETAL_POSITIONS } from '../../utils/animations';

export default function TemplatePreview() {
  const { formData } = useInvitationForm();
  const template = getTemplateById(formData.selectedTemplate);

  // Use formData advanced fields, falling back to template defaults
  const primaryColor = formData.primaryColor || template?.primaryColor || '#C9A84C';
  const accentColor = formData.accentColor || template?.accentColor || '#8B1A1A';
  const bgColor = formData.backgroundColor || template?.bgColor || '#FDF8F0';
  const fontHeading = formData.headingFont || template?.fontHeading || 'Cormorant Garamond, serif';
  const fontBody = formData.bodyFont || template?.fontBody || 'Lato, sans-serif';
  // Script font: use the template's heading font as a fallback since TemplateDefinition has no fontScript
  const fontScript = 'Great Vibes, cursive';

  const showMandala = formData.mandalaWatermark ?? false;
  const showFloral = formData.floralBorder ?? false;
  const showGoldFrame = formData.goldFrame ?? false;
  const showPetals = formData.animatedPetals ?? false;
  const showDiya = formData.diyaGlow ?? false;

  return (
    <div
      className={`relative overflow-hidden rounded-xl shadow-luxury invitation-preview ${showGoldFrame ? 'gold-frame' : ''}`}
      style={{
        backgroundColor: bgColor,
        minHeight: '600px',
        fontFamily: fontBody,
      }}
    >
      {/* Mandala watermark */}
      {showMandala && (
        <img
          src="/assets/generated/mandala-watermark.dim_800x800.png"
          alt=""
          className="mandala-watermark"
        />
      )}

      {/* Floral border */}
      {showFloral && (
        <div className="floral-border" />
      )}

      {/* Animated petals */}
      {showPetals && (
        <div className="petal-container">
          {PETAL_POSITIONS.map((pos, i) => (
            <div
              key={i}
              className="petal"
              style={{
                left: pos.left,
                width: `${pos.size}px`,
                height: `${pos.size}px`,
                animationDuration: pos.animationDuration,
                animationDelay: pos.animationDelay,
                animationName: i % 2 === 0 ? 'petalFall' : 'petalFallAlt',
                animationTimingFunction: 'linear',
                animationIterationCount: 'infinite',
                animationFillMode: 'none',
              }}
            />
          ))}
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 p-8 text-center">
        {/* Script greeting */}
        <p
          className="text-xl mb-2"
          style={{ fontFamily: fontScript, color: accentColor }}
        >
          Together with their families
        </p>

        {/* Couple names */}
        <h1
          className="text-4xl md:text-5xl font-bold leading-tight mb-4"
          style={{ fontFamily: fontHeading, color: primaryColor }}
        >
          {formData.brideName || 'Bride Name'}
          <span
            className="block text-2xl my-1"
            style={{ fontFamily: fontScript, color: accentColor }}
          >
            &amp;
          </span>
          {formData.groomName || 'Groom Name'}
        </h1>

        {/* Diya glow decoration */}
        {showDiya && (
          <div className="flex justify-center gap-6 my-4">
            <img
              src="/assets/generated/diya-glow.dim_256x256.png"
              alt=""
              className="w-12 h-12 diya-glow-effect"
            />
            <img
              src="/assets/generated/diya-glow.dim_256x256.png"
              alt=""
              className="w-12 h-12 diya-glow-effect animation-delay-500"
            />
          </div>
        )}

        {/* Divider */}
        <div
          className="w-32 h-px mx-auto my-4"
          style={{ background: `linear-gradient(90deg, transparent, ${primaryColor}, transparent)` }}
        />

        {/* Date */}
        {formData.weddingDate && (
          <p
            className="text-base tracking-widest uppercase mb-1"
            style={{ fontFamily: fontBody, color: accentColor, opacity: 0.8 }}
          >
            {new Date(formData.weddingDate).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        )}

        {/* Time */}
        {formData.weddingTime && (
          <p
            className="text-sm tracking-widest mb-4"
            style={{ fontFamily: fontBody, color: primaryColor }}
          >
            {formData.weddingTime}
          </p>
        )}

        {/* Venue */}
        {formData.venueName && (
          <div className="mt-4">
            <p
              className="text-xl font-semibold"
              style={{ fontFamily: fontHeading, color: primaryColor }}
            >
              {formData.venueName}
            </p>
            {formData.venueAddress && (
              <p
                className="text-sm mt-1 opacity-70"
                style={{ fontFamily: fontBody, color: accentColor }}
              >
                {formData.venueAddress}
              </p>
            )}
          </div>
        )}

        {/* Invitation message */}
        {formData.invitationMessage && (
          <div className="mt-6 px-4">
            <p
              className="text-sm leading-relaxed italic opacity-80"
              style={{ fontFamily: fontBody, color: accentColor }}
            >
              "{formData.invitationMessage}"
            </p>
          </div>
        )}

        {/* Corner flourishes */}
        <img
          src="/assets/generated/corner-flourish.dim_256x256.png"
          alt=""
          className="absolute top-2 left-2 w-16 h-16 opacity-30"
        />
        <img
          src="/assets/generated/corner-flourish.dim_256x256.png"
          alt=""
          className="absolute top-2 right-2 w-16 h-16 opacity-30"
          style={{ transform: 'scaleX(-1)' }}
        />
        <img
          src="/assets/generated/corner-flourish.dim_256x256.png"
          alt=""
          className="absolute bottom-2 left-2 w-16 h-16 opacity-30"
          style={{ transform: 'scaleY(-1)' }}
        />
        <img
          src="/assets/generated/corner-flourish.dim_256x256.png"
          alt=""
          className="absolute bottom-2 right-2 w-16 h-16 opacity-30"
          style={{ transform: 'scale(-1)' }}
        />
      </div>
    </div>
  );
}
