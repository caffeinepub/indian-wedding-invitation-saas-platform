import { useState, useEffect } from 'react';
import { getTemplateById } from '../../utils/templateDefinitions';
import type { Invitation } from '../../backend';

interface CountdownTimerProps {
  invitation: Invitation;
  animationMode?: 'minimal' | 'elegant' | 'cinematic';
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(weddingDate: string, weddingTime: string): TimeLeft {
  const dateStr = weddingTime ? `${weddingDate}T${weddingTime}` : weddingDate;
  const target = new Date(dateStr).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export default function CountdownTimer({ invitation, animationMode = 'elegant' }: CountdownTimerProps) {
  const template = getTemplateById(invitation.selectedTemplate);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() =>
    calculateTimeLeft(invitation.weddingDate, invitation.weddingTime)
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(invitation.weddingDate, invitation.weddingTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [invitation.weddingDate, invitation.weddingTime]);

  const primaryColor = template?.primaryColor || '#C9A84C';
  const accentColor = template?.accentColor || '#8B1A1A';
  const bgColor = template?.bgColor || '#FDF8F0';
  // Script font: TemplateDefinition has no fontScript field
  const fontScript = 'Great Vibes, cursive';
  const fontHeading = template?.fontHeading || 'Cormorant Garamond, serif';
  const fontBody = template?.fontBody || 'Lato, sans-serif';

  const isWeddingPast =
    timeLeft.days === 0 &&
    timeLeft.hours === 0 &&
    timeLeft.minutes === 0 &&
    timeLeft.seconds === 0;

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section
      className="py-16 px-6 text-center"
      style={{ backgroundColor: bgColor }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Section heading */}
        <p
          className="text-2xl md:text-3xl mb-2 animate-elegantFade"
          style={{
            fontFamily: fontScript,
            color: accentColor,
          }}
        >
          Counting down to
        </p>
        <h2
          className="text-3xl md:text-4xl font-bold mb-10 animate-fadeInUp"
          style={{
            fontFamily: fontHeading,
            color: primaryColor,
          }}
        >
          The Big Day
        </h2>

        {isWeddingPast ? (
          <p
            className="text-2xl animate-scaleIn"
            style={{
              fontFamily: fontScript,
              color: primaryColor,
            }}
          >
            The celebration has begun! 🎉
          </p>
        ) : (
          <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
            {units.map((unit, index) => (
              <div
                key={unit.label}
                className="flex flex-col items-center animate-scaleIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className="w-20 h-20 md:w-24 md:h-24 rounded-lg flex items-center justify-center shadow-luxury mb-2 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${primaryColor}20, ${primaryColor}40)`,
                    border: `2px solid ${primaryColor}60`,
                  }}
                >
                  {/* Shimmer overlay */}
                  <div
                    className="absolute inset-0 animate-shimmer"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${primaryColor}20, transparent)`,
                      backgroundSize: '200% 100%',
                    }}
                  />
                  <span
                    className="relative z-10 text-3xl md:text-4xl font-bold tabular-nums"
                    style={{
                      fontFamily: fontHeading,
                      color: primaryColor,
                    }}
                  >
                    {String(unit.value).padStart(2, '0')}
                  </span>
                </div>
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{
                    fontFamily: fontBody,
                    color: accentColor,
                    opacity: 0.7,
                  }}
                >
                  {unit.label}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
