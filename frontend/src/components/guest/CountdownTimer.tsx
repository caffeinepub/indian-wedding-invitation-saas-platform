import React, { useEffect, useState } from 'react';
import { Invitation } from '../../backend';
import { getTemplateById } from '../../utils/templateDefinitions';

interface CountdownTimerProps {
  invitation: Invitation;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(targetDate: string): TimeLeft {
  const difference = new Date(targetDate).getTime() - new Date().getTime();
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

export default function CountdownTimer({ invitation }: CountdownTimerProps) {
  const template = getTemplateById(invitation.selectedTemplate) || getTemplateById('royal-gold')!;
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [mounted, setMounted] = useState(false);

  const isDark =
    invitation.backgroundChoice === 'dark-floral' ||
    invitation.backgroundChoice === 'dark-minimal' ||
    template.id?.includes('dark') ||
    template.id?.includes('midnight') ||
    template.id?.includes('cinematic');

  const sectionBg = isDark
    ? `linear-gradient(135deg, #0d0a05 0%, #1a1208 50%, #0d0a05 100%)`
    : `linear-gradient(135deg, ${template.primaryColor}12 0%, ${template.primaryColor}06 50%, ${template.primaryColor}12 100%)`;

  const headingColor = isDark ? '#f5f0e8' : '#2c1810';
  const labelColor = isDark ? '#a09070' : '#7a6050';
  const digitBg = isDark ? 'rgba(30, 22, 10, 0.9)' : 'rgba(255, 255, 255, 0.9)';
  const digitColor = isDark ? '#f5f0e8' : '#2c1810';
  const digitBorder = `${template.primaryColor}30`;

  useEffect(() => {
    setMounted(true);
    if (!invitation.weddingDate) return;
    setTimeLeft(calculateTimeLeft(invitation.weddingDate));
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(invitation.weddingDate));
    }, 1000);
    return () => clearInterval(timer);
  }, [invitation.weddingDate]);

  if (!invitation.weddingDate) return null;

  const isPast = new Date(invitation.weddingDate).getTime() <= new Date().getTime();

  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section
      className="py-16 px-4"
      style={{ background: sectionBg }}
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div
            className="h-px w-12"
            style={{ background: `linear-gradient(90deg, transparent, ${template.primaryColor})` }}
          />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: template.primaryColor }} />
          <div
            className="h-px w-12"
            style={{ background: `linear-gradient(90deg, ${template.primaryColor}, transparent)` }}
          />
        </div>

        <h2
          className="text-2xl sm:text-3xl font-bold mb-2"
          style={{
            fontFamily: `'${template.headingFont}', serif`,
            color: headingColor,
          }}
        >
          {isPast ? 'We Are Married!' : 'Counting Down'}
        </h2>
        <p
          className="text-sm mb-8"
          style={{ color: labelColor }}
        >
          {isPast
            ? `${invitation.brideName} & ${invitation.groomName} are now married!`
            : `Until ${invitation.brideName} & ${invitation.groomName} say "I Do"`}
        </p>

        {/* Timer digits */}
        {!isPast && (
          <div
            className="flex items-center justify-center gap-3 sm:gap-6"
            style={{
              opacity: mounted ? 1 : 0,
              transition: 'opacity 0.5s ease-out',
            }}
          >
            {units.map(({ label, value }, index) => (
              <React.Fragment key={label}>
                <div className="flex flex-col items-center">
                  <div
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl flex items-center justify-center shadow-lg"
                    style={{
                      background: digitBg,
                      border: `1px solid ${digitBorder}`,
                      boxShadow: `0 4px 15px ${template.primaryColor}20`,
                    }}
                  >
                    <span
                      className="text-2xl sm:text-3xl font-bold tabular-nums"
                      style={{ color: digitColor }}
                    >
                      {String(value).padStart(2, '0')}
                    </span>
                  </div>
                  <span
                    className="text-xs mt-2 uppercase tracking-wider font-medium"
                    style={{ color: labelColor }}
                  >
                    {label}
                  </span>
                </div>
                {index < units.length - 1 && (
                  <span
                    className="text-2xl font-bold mb-5"
                    style={{ color: template.primaryColor }}
                  >
                    :
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
