'use client';

import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { User, Phone, Bell, CreditCard, Settings2, LogOut, Leaf } from 'lucide-react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar, Address, Identity } from '@coinbase/onchainkit/identity';
import { useTheme } from '../components/ThemeProvider';

export default function ProfilePage() {
  const { theme, setTheme } = useTheme();
  const [phoneNumber] = useState('+1 (555) 123-4567');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const themes = [
    { id: 'default', name: 'PlantaPal', description: 'Warm social theme' },
    { id: 'celo', name: 'Celo', description: 'Black & yellow' },
    { id: 'solana', name: 'Solana', description: 'Purple vibes' },
    { id: 'base', name: 'Base', description: 'Blue theme' },
    { id: 'coinbase', name: 'Coinbase', description: 'Navy blue' },
  ];

  return (
    <AppShell title="Profile">
      <div className="p-4 space-y-6">
        {/* User Info */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-4 mb-4">
            <Wallet>
              <ConnectWallet>
                <Avatar className="h-16 w-16" />
              </ConnectWallet>
            </Wallet>
            <div className="flex-1">
              <Wallet>
                <ConnectWallet>
                  <Name className="text-xl font-bold text-fg" />
                  <Address className="text-sm text-muted" />
                </ConnectWallet>
              </Wallet>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-muted" />
              <span className="text-fg">{phoneNumber}</span>
            </div>
            <div className="flex items-center gap-3">
              <Leaf className="w-5 h-5 text-muted" />
              <span className="text-fg">3 plants • Basic plan</span>
            </div>
          </div>
        </div>

        {/* Theme Selection */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-fg mb-4">Theme</h2>
          <div className="grid grid-cols-1 gap-3">
            {themes.map((themeOption) => (
              <button
                key={themeOption.id}
                onClick={() => setTheme(themeOption.id as any)}
                className={`p-3 rounded-lg border-2 transition-all duration-200 text-left ${
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

        {/* Settings */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-fg mb-4">Settings</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-muted" />
                <span className="text-fg">SMS Notifications</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={notificationsEnabled}
                  onChange={(e) => setNotificationsEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>
            
            <button className="flex items-center gap-3 w-full text-left p-3 hover:bg-surface rounded-lg transition-colors">
              <CreditCard className="w-5 h-5 text-muted" />
              <span className="text-fg">Subscription & Billing</span>
            </button>
            
            <button className="flex items-center gap-3 w-full text-left p-3 hover:bg-surface rounded-lg transition-colors">
              <Settings2 className="w-5 h-5 text-muted" />
              <span className="text-fg">App Settings</span>
            </button>
          </div>
        </div>

        {/* Subscription Info */}
        <div className="glass-card p-6">
          <h2 className="text-lg font-semibold text-fg mb-4">Subscription</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-muted">Plan</span>
              <span className="text-fg font-medium">Basic ($5.99/month)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Plants</span>
              <span className="text-fg">3 of 10 used</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Next billing</span>
              <span className="text-fg">Jan 15, 2024</span>
            </div>
          </div>
          
          <button className="btn-primary w-full mt-4">
            Upgrade to Premium
          </button>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button className="flex items-center gap-3 w-full text-left p-4 glass-card hover:bg-opacity-15 transition-colors text-red-400">
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </AppShell>
  );
}
