'use client';

import { useState, useEffect } from 'react';
import { AppShell } from './components/AppShell';
import { OnboardingFlow } from './components/OnboardingFlow';
import { PlantCard } from './components/PlantCard';
import { Plant } from '@/lib/types';
import { Leaf, Plus, MessageCircle, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar, Identity } from '@coinbase/onchainkit/identity';

// Mock data for demo
const mockPlants: Plant[] = [
  {
    plantId: '1',
    userId: 'user1',
    qrCodeId: 'qr1',
    name: 'Brad',
    plantType: 'snake_plant',
    personalityType: 'Solana Sage',
    mood: 'thirsty',
    lastWatered: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    needsWater: true,
    needsLight: false,
    needsFertilizer: false,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    lastMessage: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
    careStreak: 12,
  },
  {
    plantId: '2',
    userId: 'user1',
    qrCodeId: 'qr2',
    name: 'Ivy',
    plantType: 'pothos',
    personalityType: 'Chill Vibes',
    mood: 'happy',
    lastWatered: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    needsWater: false,
    needsLight: true,
    needsFertilizer: false,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    careStreak: 8,
  },
];

export default function HomePage() {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [plants, setPlants] = useState<Plant[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user has completed onboarding
    const onboardingComplete = localStorage.getItem('plantapal-onboarded');
    if (onboardingComplete) {
      setIsOnboarded(true);
      setPlants(mockPlants);
    }
    setIsLoading(false);
  }, []);

  const handleOnboardingComplete = (data: { phoneNumber: string; notifications: boolean }) => {
    localStorage.setItem('plantapal-onboarded', 'true');
    localStorage.setItem('plantapal-phone', data.phoneNumber);
    setIsOnboarded(true);
    setPlants(mockPlants);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="animate-pulse-slow">
          <Leaf className="w-12 h-12 text-accent" />
        </div>
      </div>
    );
  }

  if (!isOnboarded) {
    return <OnboardingFlow onComplete={handleOnboardingComplete} />;
  }

  const plantsNeedingCare = plants.filter(plant => 
    plant.needsWater || plant.needsLight || plant.needsFertilizer
  );

  return (
    <AppShell 
      title="PlantaPal"
      actions={
        <Wallet>
          <ConnectWallet>
            <Avatar className="h-8 w-8" />
            <Name />
          </ConnectWallet>
        </Wallet>
      }
    >
      <div className="p-4 space-y-6">
        {/* Welcome Section */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
              <Leaf className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-fg">Good morning! 🌱</h1>
              <p className="text-muted">Your plants are ready to chat</p>
            </div>
          </div>
          
          {plantsNeedingCare.length > 0 && (
            <div className="bg-accent bg-opacity-10 border border-accent border-opacity-20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <MessageCircle className="w-5 h-5 text-accent" />
                <span className="font-medium text-accent">
                  {plantsNeedingCare.length} plant{plantsNeedingCare.length > 1 ? 's' : ''} need{plantsNeedingCare.length === 1 ? 's' : ''} attention
                </span>
              </div>
              <p className="text-sm text-muted">
                Check your messages for care reminders!
              </p>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="metric-card">
            <div className="text-2xl font-bold text-accent">{plants.length}</div>
            <div className="text-sm text-muted">Plants</div>
          </div>
          <div className="metric-card">
            <div className="text-2xl font-bold text-green-400">
              {Math.round(plants.reduce((acc, plant) => acc + plant.careStreak, 0) / plants.length) || 0}
            </div>
            <div className="text-sm text-muted">Avg Streak</div>
          </div>
          <div className="metric-card">
            <div className="text-2xl font-bold text-yellow-400">{plantsNeedingCare.length}</div>
            <div className="text-sm text-muted">Need Care</div>
          </div>
        </div>

        {/* Recent Messages */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-fg">Recent Messages</h2>
            <Link href="/messages" className="text-accent text-sm font-medium">
              View all
            </Link>
          </div>
          
          <div className="glass-card p-4 space-y-4">
            <div className="chat-bubble chat-bubble-plant">
              <p className="text-sm">
                "Hey! Brad here... feeling a bit parched. Time to add some liquidity to my soil pool! 💧"
              </p>
            </div>
            <div className="chat-bubble chat-bubble-plant">
              <p className="text-sm">
                "Yo! Ivy here, just chillin' but could use some more of those sunny vibes! ☀️"
              </p>
            </div>
          </div>
        </div>

        {/* Your Plants */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-fg">Your Plants</h2>
            <Link href="/add-plant" className="text-accent text-sm font-medium">
              Add plant
            </Link>
          </div>
          
          {plants.length > 0 ? (
            <div className="space-y-4">
              {plants.map((plant) => (
                <PlantCard
                  key={plant.plantId}
                  plant={plant}
                  variant="compact"
                  onClick={() => {/* Navigate to plant detail */}}
                />
              ))}
            </div>
          ) : (
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-surface rounded-full flex items-center justify-center mb-4">
                <Leaf className="w-8 h-8 text-muted" />
              </div>
              <h3 className="text-lg font-medium text-fg mb-2">No plants yet</h3>
              <p className="text-muted mb-4">
                Add your first plant to start receiving personalized care reminders!
              </p>
              <Link href="/add-plant" className="btn-primary inline-flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Add Your First Plant
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Link href="/add-plant" className="glass-card p-4 text-center hover:bg-opacity-15 transition-all duration-200">
            <Plus className="w-8 h-8 text-accent mx-auto mb-2" />
            <span className="text-sm font-medium text-fg">Add Plant</span>
          </Link>
          <Link href="/subscription" className="glass-card p-4 text-center hover:bg-opacity-15 transition-all duration-200">
            <TrendingUp className="w-8 h-8 text-accent mx-auto mb-2" />
            <span className="text-sm font-medium text-fg">Upgrade</span>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
