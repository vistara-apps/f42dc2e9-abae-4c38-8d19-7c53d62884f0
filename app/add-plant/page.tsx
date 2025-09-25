'use client';

import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { QRScanner } from '../components/QRScanner';
import { PlantType } from '@/lib/types';
import { PLANT_CARE_SCHEDULES, PERSONALITIES, PLANT_EMOJIS } from '@/lib/constants';
import { generatePlantName, generateQRCode } from '@/lib/utils';
import { Leaf, Scan, Edit3 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function AddPlantPage() {
  const router = useRouter();
  const [step, setStep] = useState<'scan' | 'details' | 'personality'>('scan');
  const [qrCode, setQrCode] = useState('');
  const [plantType, setPlantType] = useState<PlantType>('snake_plant');
  const [plantName, setPlantName] = useState('');
  const [selectedPersonality, setSelectedPersonality] = useState(PERSONALITIES[0].personalityId);

  const handleQRScan = (code: string) => {
    setQrCode(code);
    setPlantName(generatePlantName(plantType));
    setStep('details');
  };

  const handleSkipQR = () => {
    setQrCode(generateQRCode());
    setPlantName(generatePlantName(plantType));
    setStep('details');
  };

  const handleDetailsNext = () => {
    setStep('personality');
  };

  const handleComplete = () => {
    // In a real app, this would save to the database
    const newPlant = {
      plantId: Date.now().toString(),
      userId: 'user1',
      qrCodeId: qrCode,
      name: plantName,
      plantType,
      personalityType: PERSONALITIES.find(p => p.personalityId === selectedPersonality)?.name || 'Chill Vibes',
      mood: 'happy' as const,
      lastWatered: new Date(),
      needsWater: false,
      needsLight: false,
      needsFertilizer: false,
      createdAt: new Date(),
      careStreak: 0,
    };

    console.log('New plant created:', newPlant);
    router.push('/plants');
  };

  const plantTypes = Object.keys(PLANT_CARE_SCHEDULES) as PlantType[];
  const selectedPersonalityData = PERSONALITIES.find(p => p.personalityId === selectedPersonality);

  return (
    <AppShell title="Add Plant" showBackButton>
      <div className="p-4">
        {step === 'scan' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-fg">Add a New Plant</h1>
              <p className="text-muted">
                Scan the QR code on your plant's pot or add manually
              </p>
            </div>

            <QRScanner onScan={handleQRScan} />

            <div className="text-center">
              <button
                onClick={handleSkipQR}
                className="btn-secondary flex items-center gap-2 mx-auto"
              >
                <Edit3 className="w-5 h-5" />
                Add Manually Instead
              </button>
            </div>
          </div>
        )}

        {step === 'details' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-fg">Plant Details</h1>
              <p className="text-muted">
                Tell us about your new plant friend
              </p>
            </div>

            <div className="glass-card p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-fg mb-2">
                  Plant Name
                </label>
                <input
                  type="text"
                  value={plantName}
                  onChange={(e) => setPlantName(e.target.value)}
                  placeholder="Give your plant a name"
                  className="input-field"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-fg mb-2">
                  Plant Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {plantTypes.map((type) => {
                    const schedule = PLANT_CARE_SCHEDULES[type];
                    const emoji = PLANT_EMOJIS[type];
                    const isSelected = plantType === type;
                    
                    return (
                      <button
                        key={type}
                        onClick={() => setPlantType(type)}
                        className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                          isSelected 
                            ? 'border-accent bg-accent bg-opacity-10' 
                            : 'border-border bg-surface hover:border-accent hover:border-opacity-50'
                        }`}
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl">{emoji}</span>
                          <div>
                            <div className="font-medium text-fg capitalize">
                              {type.replace('_', ' ')}
                            </div>
                            <div className="text-xs text-muted">
                              {schedule.difficulty} care
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-muted">
                          Water every {schedule.wateringFrequency} days
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {qrCode && (
                <div className="bg-surface rounded-lg p-3">
                  <div className="text-sm text-muted mb-1">QR Code ID:</div>
                  <div className="text-sm font-mono text-fg">{qrCode}</div>
                </div>
              )}
            </div>

            <button
              onClick={handleDetailsNext}
              disabled={!plantName.trim()}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Choose Personality
            </button>
          </div>
        )}

        {step === 'personality' && (
          <div className="space-y-6">
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-bold text-fg">Choose Personality</h1>
              <p className="text-muted">
                How should {plantName} talk to you?
              </p>
            </div>

            <div className="space-y-4">
              {PERSONALITIES.map((personality) => {
                const isSelected = selectedPersonality === personality.personalityId;
                
                return (
                  <button
                    key={personality.personalityId}
                    onClick={() => setSelectedPersonality(personality.personalityId)}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                      isSelected 
                        ? 'border-accent bg-accent bg-opacity-10' 
                        : 'border-border bg-surface hover:border-accent hover:border-opacity-50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-xl">
                          {personality.style === 'wise' ? '🧙' : 
                           personality.style === 'chill' ? '😎' : 
                           personality.style === 'dramatic' ? '🎭' : '🌱'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-fg mb-1">{personality.name}</h3>
                        <p className="text-sm text-muted mb-2">{personality.description}</p>
                        <div className="text-xs text-accent">
                          Style: {personality.style} • Solana-themed
                        </div>
                      </div>
                    </div>
                    
                    {isSelected && selectedPersonalityData && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="text-sm text-muted mb-2">Sample message:</div>
                        <div className="chat-bubble chat-bubble-plant">
                          <p className="text-sm">
                            {selectedPersonalityData.messageTemplates.greeting[0]}
                          </p>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleComplete}
              className="btn-primary w-full"
            >
              Add {plantName} to My Plants
            </button>
          </div>
        )}
      </div>
    </AppShell>
  );
}
