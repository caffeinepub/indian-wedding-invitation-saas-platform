import React from 'react';
import type { Invitation } from '@/backend';
import { getTemplateById } from '@/utils/templateDefinitions';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface CoupleIntroductionProps {
  invitation: Invitation;
}

export default function CoupleIntroduction({ invitation }: CoupleIntroductionProps) {
  const template = getTemplateById(invitation.selectedTemplate);
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section
      className="py-16 px-4"
      style={{ background: template.bgColor }}
      ref={ref}
    >
      <div
        className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Ornament */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-16 h-px" style={{ background: `${template.primaryColor}60` }} />
          <img
            src="/assets/generated/corner-flourish.dim_256x256.png"
            alt=""
            className="w-10 h-10 opacity-60"
            onError={(e) => {
              const t = e.target as HTMLImageElement;
              t.style.display = 'none';
            }}
          />
          <div className="w-16 h-px" style={{ background: `${template.primaryColor}60` }} />
        </div>

        <p
          className="font-inter text-sm tracking-[0.3em] uppercase mb-3"
          style={{ color: template.primaryColor }}
        >
          ✦ With Great Joy ✦
        </p>

        {/* Invitation Message */}
        {invitation.invitationMessage && (
          <blockquote
            className="text-lg sm:text-xl leading-relaxed mb-8 italic"
            style={{ fontFamily: 'Cormorant Garamond', color: template.textColor }}
          >
            "{invitation.invitationMessage}"
          </blockquote>
        )}

        {/* Family Details */}
        {invitation.familyDetails && (
          <div
            className="p-6 rounded-2xl border"
            style={{
              background: `${template.primaryColor}08`,
              borderColor: `${template.primaryColor}25`,
            }}
          >
            <h3
              className="font-cinzel text-lg font-bold mb-3"
              style={{ fontFamily: template.headingFont, color: template.primaryColor }}
            >
              Our Families
            </h3>
            <p
              className="font-inter text-sm leading-relaxed whitespace-pre-line"
              style={{ color: template.textColor, opacity: 0.8 }}
            >
              {invitation.familyDetails}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
