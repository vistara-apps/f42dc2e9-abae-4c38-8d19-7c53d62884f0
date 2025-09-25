'use client';

import { useState } from 'react';
import { Leaf, MessageCircle, Smartphone, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingFlowProps {
  onComplete: (data: { phoneNumber: string; notifications: boolean }) => void;
  variant?: 'multiStep';
}

export function OnboardingFlow({ onComplete, variant = 'multiStep' }: OnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [notifications, setNotifications] = useState(true);

  const steps = [
    {
      icon: Leaf,
      title: 'Welcome to PlantaPal!',
      description: 'Your houseplants are about to start texting you with personalized care reminders.',
      content: (
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
            <Leaf className="w-12 h-12 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-fg">Welcome to PlantaPal!</h2>
            <p className="text-muted">
              Your houseplants are about to start texting you with personalized care reminders.
            </p>
          </div>
        </div>
      )
    },
    {
      icon: MessageCircle,
      title: 'Plant Personalities',
      description: 'Each plant gets a unique personality with Solana-themed vibes.',
      content: (
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center">
            <MessageCircle className="w-12 h-12 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-fg">Meet Your Plant Friends</h2>
            <p className="text-muted">
              Each plant gets a unique personality with Solana-themed vibes. They'll text you with care reminders, stories, and their current mood!
            </p>
          </div>
          <div className="glass-card p-4 text-left">
            <div className="chat-bubble chat-bubble-plant">
              <p className="text-sm">
                "Hey! Brad the Snake Plant here... feeling a bit parched. Time to add some liquidity to my soil pool! 💧"
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      icon: Smartphone,
      title: 'SMS Notifications',
      description: 'Enter your phone number to receive plant messages.',
      content: (
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 to-cyan-600 rounded-full flex items-center justify-center">
            <Smartphone className="w-12 h-12 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-fg">Stay Connected</h2>
            <p className="text-muted">
              Enter your phone number to receive personalized care reminders from your plants.
            </p>
          </div>
          <div className="space-y-4">
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="+1 (555) 123-4567"
              className="input-field"
            />
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="w-5 h-5 text-accent bg-surface border-border rounded focus:ring-accent"
              />
              <span className="text-sm text-fg">
                I want to receive SMS notifications from my plants
              </span>
            </label>
          </div>
        </div>
      )
    },
    {
      icon: CheckCircle,
      title: 'All Set!',
      description: 'You\'re ready to start your plant care journey.',
      content: (
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-fg">You're All Set!</h2>
            <p className="text-muted">
              Ready to start your plant care journey? Add your first plant and let the conversations begin!
            </p>
          </div>
          <div className="glass-card p-4 space-y-3">
            <h3 className="font-medium text-fg">What's Next:</h3>
            <ul className="text-sm text-muted space-y-1 text-left">
              <li>• Scan a QR code or add a plant manually</li>
              <li>• Choose a personality for your plant</li>
              <li>• Start receiving personalized care reminders</li>
              <li>• Build your care streak and watch your plants thrive!</li>
            </ul>
          </div>
        </div>
      )
    }
  ];

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;
  const canProceed = currentStep !== 2 || (phoneNumber.trim() && notifications);

  const handleNext = () => {
    if (isLastStep) {
      onComplete({ phoneNumber, notifications });
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Progress Bar */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted">Step {currentStep + 1} of {steps.length}</span>
          <span className="text-sm text-muted">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
        </div>
        <div className="w-full bg-surface rounded-full h-2">
          <div 
            className="bg-accent h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 flex flex-col justify-center">
        <div className="animate-fade-in">
          {currentStepData.content}
        </div>
      </div>

      {/* Navigation */}
      <div className="p-4 space-y-3">
        <button
          onClick={handleNext}
          disabled={!canProceed}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLastStep ? 'Get Started' : 'Continue'}
        </button>
        
        {currentStep > 0 && (
          <button
            onClick={handlePrevious}
            className="btn-secondary w-full"
          >
            Back
          </button>
        )}
      </div>

      {/* Step Indicators */}
      <div className="flex justify-center gap-2 pb-4">
        {steps.map((_, index) => (
          <div
            key={index}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-200',
              index <= currentStep ? 'bg-accent' : 'bg-surface'
            )}
          />
        ))}
      </div>
    </div>
  );
}
