interface Step {
  id: number;
  title: string;
  description: string;
}

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: Step[];
}

export default function ProgressBar({ currentStep, totalSteps, steps }: ProgressBarProps) {
  return (
    <div className="w-full">
      {/* Progress line */}
      <div className="relative flex items-center justify-between mb-2">
        <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gold-100 dark:bg-charcoal-700 rounded-full">
          <div
            className="h-full bg-gradient-to-r from-gold-400 to-gold-500 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>

        {steps.map((step) => (
          <div key={step.id} className="relative z-10 flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 border-2 ${
                step.id < currentStep
                  ? 'bg-gold-500 border-gold-500 text-white shadow-luxury'
                  : step.id === currentStep
                  ? 'bg-white dark:bg-charcoal-800 border-gold-500 text-gold-600 dark:text-gold-400 shadow-luxury'
                  : 'bg-white dark:bg-charcoal-800 border-gold-200 dark:border-charcoal-600 text-charcoal-400 dark:text-ivory-500'
              }`}
            >
              {step.id < currentStep ? '✓' : step.id}
            </div>
          </div>
        ))}
      </div>

      {/* Step labels */}
      <div className="flex justify-between mt-2">
        {steps.map((step) => (
          <div key={step.id} className="flex flex-col items-center" style={{ width: `${100 / totalSteps}%` }}>
            <span
              className={`text-xs font-sans text-center transition-colors ${
                step.id === currentStep
                  ? 'text-gold-600 dark:text-gold-400 font-semibold'
                  : step.id < currentStep
                  ? 'text-gold-500'
                  : 'text-charcoal-400 dark:text-ivory-500'
              }`}
            >
              {step.title}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
