import React from 'react';
import { Check } from 'lucide-react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: { label: string; icon?: React.ReactNode }[];
}

export default function ProgressBar({ currentStep, totalSteps, steps }: ProgressBarProps) {
  return (
    <div className="w-full px-4 py-6">
      {/* Progress line */}
      <div className="relative flex items-center justify-between">
        {/* Background line */}
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-border" />
        {/* Active line */}
        <div
          className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 transition-all duration-500 ease-out"
          style={{
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
            background: 'linear-gradient(90deg, oklch(0.55 0.14 68), oklch(0.82 0.13 82))',
          }}
        />

        {/* Step circles */}
        {steps.map((step, index) => {
          const stepNum = index + 1;
          const isCompleted = stepNum < currentStep;
          const isActive = stepNum === currentStep;

          return (
            <div key={index} className="relative flex flex-col items-center gap-2 z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 font-cinzel text-sm font-bold ${
                  isCompleted
                    ? 'bg-gold text-foreground shadow-gold'
                    : isActive
                    ? 'bg-gold-dark text-ivory shadow-gold-lg scale-110'
                    : 'bg-background border-2 border-border text-muted-foreground'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{stepNum}</span>
                )}
              </div>
              <span
                className={`text-xs font-inter font-medium tracking-wide hidden sm:block ${
                  isActive ? 'text-gold-dark' : isCompleted ? 'text-gold' : 'text-muted-foreground'
                }`}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
