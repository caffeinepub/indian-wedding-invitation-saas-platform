import React, { useState, useEffect } from 'react';
import type { Invitation } from '@/backend';
import { getTemplateById } from '@/utils/templateDefinitions';

interface CountdownTimerProps {
  invitation: Invitation;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(weddingDate: string, weddingTime: string): TimeLeft {
  const dateTimeStr = weddingTime ? `${weddingDate}T${weddingTime}` : weddingDate;
  const target = new Date(dateTimeStr).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}

export default function CountdownTimer({ invitation }: CountdownTimerProps) {
  const template = getTemplateById(invitation.selectedTemplate);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(invitation.weddingDate, invitation.weddingTime)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(invitation.weddingDate, invitation.weddingTime));
    }, 1000);
    return () => clearInterval(interval);
  }, [invitation.weddingDate, invitation.weddingTime]);

  const isDark = template.category === 'cinematic-dark';
  const units = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section
      className="py-16 px-4"
      style={{ background: isDark ? template.bgColor : template.bgColor }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <p
          className="font-inter text-sm tracking-[0.3em] uppercase mb-3"
          style={{ color: template.primaryColor }}
        >
          ✦ Counting Down ✦
        </p>
        <h2
          className="font-cinzel text-2xl md:text-3xl font-bold mb-10"
          style={{ fontFamily: template.headingFont, color: template.textColor }}
        >
          The Big Day Approaches
        </h2>

        <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-lg mx-auto">
          {units.map(({ label, value }) => (
            <div
              key={label}
              className="countdown-box p-3 sm:p-5 text-center"
              style={{
                background: isDark ? 'rgba(255,255,255,0.05)' : `${template.primaryColor}15`,
                border: `1px solid ${template.primaryColor}40`,
                borderRadius: '12px',
              }}
            >
              <div
                className="font-cinzel text-3xl sm:text-4xl font-bold tabular-nums"
                style={{ color: template.primaryColor }}
              >
                {String(value).padStart(2, '0')}
              </div>
              <div
                className="font-inter text-xs uppercase tracking-widest mt-1"
                style={{ color: template.textColor, opacity: 0.6 }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
