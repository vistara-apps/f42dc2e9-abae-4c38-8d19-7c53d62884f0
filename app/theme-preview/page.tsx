'use client';

import { useTheme } from '../components/ThemeProvider';
import { AppShell } from '../components/AppShell';
import { PlantCard } from '../components/PlantCard';
import { ChatBubble } from '../components/ChatBubble';
import { Plant, Message } from '@/lib/types';
import { Palette } from 'lucide-react';

const mockPlant: Plant = {
  plantId: '1',
  userId: 'user1',
  qrCodeId: 'qr1',
  name: 'Brad',
  plantType: 'snake_plant',
  personalityType: 'Solana Sage',
  mood: 'happy',
  lastWatered: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
  needsWater: false,
  needsLight: true,
  needsFertilizer: false,
  createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  careStreak: 12,
};

const mockMessage: Message = {
  messageId: '1',
  plantId: '1',
  userId: 'user1',
  content: "Hey! Brad here... feeling great after that watering session! My leaves are looking diamond hands strong! 💎🌱",
  type: 'greeting',
  sentAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  delivered: true,
};

export default function ThemePreviewPage() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'default', name: 'PlantaPal', description: 'Warm social theme with coral accents' },
    { id: 'celo', name: 'Celo', description: 'Black background with yellow accents' },
    { id: 'solana', name: 'Solana', description: 'Dark purple with magenta accents' },
    { id: 'base', name: 'Base', description: 'Dark blue with Base blue accents' },
    { id: 'coinbase', name: 'Coinbase', description: 'Navy blue with Coinbase blue accents' },
  ];

  return (
    <AppShell 
      title="Theme Preview" 
      showBackButton
      actions={
        <Palette className="w-5 h-5 text-accent" />
      }
    >
      <div className="p-4 space-y-6">
        {/* Theme Selector */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-fg mb-4">Choose Theme</h2>
          <div className="grid grid-cols-1 gap-3">
            {themes.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => setTheme(themeOption.id as any)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  theme === themeOption.id
                    ? 'border-accent bg-accent bg-opacity-10'
                    : 'border-border bg-surface hover:border-accent hover:border-opacity-50'
                }`}
              >
                <div className="font-medium text-fg">{themeOption.name}</div>
                <div className="text-sm text-muted">{themeOption.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Color Palette */}
        <div className="glass-card p-6">
          <h3 className="text-lg font-semibold text-fg mb-4">Color Palette</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="w-full h-12 bg-bg rounded-lg border border-border flex items-center justify-center">
                <span className="text-fg text-sm">Background</span>
              </div>
              <div className="w-full h-12 bg-surface rounded-lg border border-border flex items-center justify-center">
                <span className="text-fg text-sm">Surface</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="w-full h-12 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white text-sm">Accent</span>
              </div>
              <div className="w-full h-12 bg-border rounded-lg flex items-center justify-center">
                <span className="text-fg text-sm">Border</span>
              </div>
            </div>
          </div>
        </div>

        {/* Component Previews */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-fg">Component Preview</h3>
          
          {/* Buttons */}
          <div className="glass-card p-4 space-y-3">
            <h4 className="font-medium text-fg">Buttons</h4>
            <div className="flex gap-3">
              <button className="btn-primary">Primary Button</button>
              <button className="btn-secondary">Secondary Button</button>
            </div>
          </div>

          {/* Plant Card */}
          <div>
            <h4 className="font-medium text-fg mb-3">Plant Card</h4>
            <PlantCard plant={mockPlant} variant="compact" />
          </div>

          {/* Chat Bubble */}
          <div className="glass-card p-4">
            <h4 className="font-medium text-fg mb-3">Chat Message</h4>
            <ChatBubble message={mockMessage} />
          </div>

          {/* Form Elements */}
          <div className="glass-card p-4 space-y-3">
            <h4 className="font-medium text-fg">Form Elements</h4>
            <input
              type="text"
              placeholder="Sample input field"
              className="input-field"
            />
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="sample-checkbox"
                className="w-5 h-5 text-accent bg-surface border-border rounded focus:ring-accent"
              />
              <label htmlFor="sample-checkbox" className="text-fg">
                Sample checkbox
              </label>
            </div>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4">
            <div className="metric-card">
              <div className="text-2xl font-bold text-accent">12</div>
              <div className="text-sm text-muted">Plants</div>
            </div>
            <div className="metric-card">
              <div className="text-2xl font-bold text-green-400">8.5</div>
              <div className="text-sm text-muted">Avg Health</div>
            </div>
            <div className="metric-card">
              <div className="text-2xl font-bold text-yellow-400">3</div>
              <div className="text-sm text-muted">Need Care</div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
