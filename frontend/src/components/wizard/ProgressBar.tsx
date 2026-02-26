import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  label: string;
}

interface ProgressBarProps {
  steps: Step[];
  currentStep: number;
  totalSteps?: number;
}

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Connecting line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gold/20 z-0" />
        <div
          className="absolute top-5 left-0 h-0.5 bg-gradient-to-r from-gold to-gold-dark z-0 transition-all duration-500"
          style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
        />

        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={step.id} className="flex flex-col items-center z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                  isCompleted
                    ? 'bg-gold border-gold text-charcoal'
                    : isActive
                    ? 'bg-ivory border-gold text-gold shadow-luxury'
                    : 'bg-ivory border-gold/30 text-charcoal/40'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span className="font-elegant text-sm font-semibold">{index + 1}</span>
                )}
              </div>
              <span
                className={`mt-2 text-xs font-elegant font-medium transition-colors hidden sm:block ${
                  isActive ? 'text-gold' : isCompleted ? 'text-charcoal' : 'text-charcoal/40'
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
