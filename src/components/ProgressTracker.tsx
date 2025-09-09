import React from 'react';
import { Check } from 'lucide-react';

interface Step {
  name: string;
  completed: boolean;
  current: boolean;
}

interface ProgressTrackerProps {
  currentStep: number;
}

const ProgressTracker: React.FC<ProgressTrackerProps> = ({ currentStep }) => {
  const steps: Step[] = [
    { name: 'Personalization', completed: currentStep > 0, current: currentStep === 0 },
    { name: 'Library', completed: currentStep > 1, current: currentStep === 1 },
    { name: 'Simulation', completed: currentStep > 2, current: currentStep === 2 },
    { name: 'Assessment', completed: currentStep > 3, current: currentStep === 3 },
    { name: 'Dashboard', completed: currentStep > 4, current: currentStep === 4 },
  ];

  return (
    <div className="w-full bg-white py-4 px-6 shadow-sm border-b border-gray-200">
      <nav aria-label="Progress">
        <ol className="flex items-center justify-center space-x-8">
          {steps.map((step, stepIdx) => (
            <li key={step.name} className="flex items-center">
              <div className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step.completed
                      ? 'bg-[#000CAD] text-white'
                      : step.current
                      ? 'bg-[#12EDA6] text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {step.completed ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    stepIdx + 1
                  )}
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    step.current
                      ? 'text-[#000CAD]'
                      : step.completed
                      ? 'text-gray-900'
                      : 'text-gray-500'
                  }`}
                >
                  {step.name}
                </span>
              </div>
              {stepIdx < steps.length - 1 && (
                <div
                  className={`ml-8 w-8 h-0.5 ${
                    step.completed ? 'bg-[#000CAD]' : 'bg-gray-200'
                  }`}
                />
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
};

export default ProgressTracker;