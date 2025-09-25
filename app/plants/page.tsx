'use client';

import { useState } from 'react';
import { AppShell } from '../components/AppShell';
import { PlantCard } from '../components/PlantCard';
import { Plant } from '@/lib/types';
import { Search, Filter, Plus } from 'lucide-react';
import Link from 'next/link';

// Mock data
const mockPlants: Plant[] = [
  {
    plantId: '1',
    userId: 'user1',
    qrCodeId: 'qr1',
    name: 'Brad',
    plantType: 'snake_plant',
    personalityType: 'Solana Sage',
    mood: 'thirsty',
    lastWatered: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    needsWater: true,
    needsLight: false,
    needsFertilizer: false,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    lastMessage: new Date(Date.now() - 4 * 60 * 60 * 1000),
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
    lastWatered: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    needsWater: false,
    needsLight: true,
    needsFertilizer: false,
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    careStreak: 8,
  },
  {
    plantId: '3',
    userId: 'user1',
    qrCodeId: 'qr3',
    name: 'Diva',
    plantType: 'fiddle_leaf_fig',
    personalityType: 'Drama Queen',
    mood: 'grumpy',
    lastWatered: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    needsWater: true,
    needsLight: true,
    needsFertilizer: true,
    createdAt: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    careStreak: 3,
  },
];

export default function PlantsPage() {
  const [plants] = useState<Plant[]>(mockPlants);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'needs_care' | 'healthy'>('all');

  const filteredPlants = plants.filter(plant => {
    const matchesSearch = plant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         plant.plantType.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'needs_care' && (plant.needsWater || plant.needsLight || plant.needsFertilizer)) ||
                         (filterStatus === 'healthy' && !plant.needsWater && !plant.needsLight && !plant.needsFertilizer);
    
    return matchesSearch && matchesFilter;
  });

  return (
    <AppShell 
      title="My Plants"
      actions={
        <Link href="/add-plant" className="p-2 hover:bg-surface rounded-lg transition-colors">
          <Plus className="w-5 h-5 text-accent" />
        </Link>
      }
    >
      <div className="p-4 space-y-4">
        {/* Search and Filter */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search plants..."
              className="input-field pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === 'all' 
                  ? 'bg-accent text-white' 
                  : 'bg-surface text-muted hover:text-fg'
              }`}
            >
              All ({plants.length})
            </button>
            <button
              onClick={() => setFilterStatus('needs_care')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === 'needs_care' 
                  ? 'bg-accent text-white' 
                  : 'bg-surface text-muted hover:text-fg'
              }`}
            >
              Needs Care ({plants.filter(p => p.needsWater || p.needsLight || p.needsFertilizer).length})
            </button>
            <button
              onClick={() => setFilterStatus('healthy')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === 'healthy' 
                  ? 'bg-accent text-white' 
                  : 'bg-surface text-muted hover:text-fg'
              }`}
            >
              Healthy ({plants.filter(p => !p.needsWater && !p.needsLight && !p.needsFertilizer).length})
            </button>
          </div>
        </div>

        {/* Plants List */}
        <div className="space-y-4">
          {filteredPlants.length > 0 ? (
            filteredPlants.map((plant) => (
              <PlantCard
                key={plant.plantId}
                plant={plant}
                variant="detailed"
                onClick={() => {/* Navigate to plant detail */}}
              />
            ))
          ) : (
            <div className="glass-card p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-surface rounded-full flex items-center justify-center mb-4">
                <Filter className="w-8 h-8 text-muted" />
              </div>
              <h3 className="text-lg font-medium text-fg mb-2">No plants found</h3>
              <p className="text-muted mb-4">
                {searchQuery || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria.'
                  : 'Add your first plant to get started!'
                }
              </p>
              {!searchQuery && filterStatus === 'all' && (
                <Link href="/add-plant" className="btn-primary inline-flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Add Your First Plant
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
