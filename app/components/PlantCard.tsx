'use client';

import { Plant } from '@/lib/types';
import { calculatePlantHealth, formatRelativeTime } from '@/lib/utils';
import { PLANT_EMOJIS } from '@/lib/constants';
import { Droplets, Sun, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlantCardProps {
  plant: Plant;
  variant?: 'compact' | 'detailed';
  onClick?: () => void;
}

export function PlantCard({ plant, variant = 'compact', onClick }: PlantCardProps) {
  const health = calculatePlantHealth(plant);
  const emoji = PLANT_EMOJIS[plant.plantType as keyof typeof PLANT_EMOJIS] || '🌱';

  if (variant === 'compact') {
    return (
      <div 
        className={cn('plant-card', onClick && 'cursor-pointer')}
        onClick={onClick}
      >
        <div className="flex items-center gap-4">
          <div className="text-3xl">{emoji}</div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-fg truncate">{plant.name}</h3>
              <div className={cn(
                'status-indicator',
                health.status === 'healthy' && 'status-healthy',
                health.status === 'needs_care' && 'status-needs-care',
                health.status === 'urgent' && 'status-urgent'
              )} />
            </div>
            <p className="text-sm text-muted capitalize">
              {plant.plantType.replace('_', ' ')} • {plant.personalityType}
            </p>
            <p className="text-xs text-muted">
              Last watered {formatRelativeTime(plant.lastWatered)}
            </p>
          </div>
        </div>
        
        {health.issues.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {health.issues.slice(0, 2).map((issue, index) => (
              <span 
                key={index}
                className="text-xs bg-accent bg-opacity-20 text-accent px-2 py-1 rounded-full"
              >
                {issue}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div 
      className={cn('plant-card', onClick && 'cursor-pointer')}
      onClick={onClick}
    >
      <div className="flex items-start gap-4 mb-4">
        <div className="text-4xl">{emoji}</div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-fg">{plant.name}</h3>
            <div className={cn(
              'status-indicator',
              health.status === 'healthy' && 'status-healthy',
              health.status === 'needs_care' && 'status-needs-care',
              health.status === 'urgent' && 'status-urgent'
            )} />
          </div>
          <p className="text-muted capitalize mb-1">
            {plant.plantType.replace('_', ' ')}
          </p>
          <p className="text-sm text-accent font-medium">
            {plant.personalityType} personality
          </p>
        </div>
      </div>

      {/* Care Status */}
      <div className="grid grid-cols-3 gap-3 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <Droplets className={cn(
            'w-4 h-4',
            plant.needsWater ? 'text-blue-400' : 'text-muted'
          )} />
          <span className="text-muted">Water</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Sun className={cn(
            'w-4 h-4',
            plant.needsLight ? 'text-yellow-400' : 'text-muted'
          )} />
          <span className="text-muted">Light</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Zap className={cn(
            'w-4 h-4',
            plant.needsFertilizer ? 'text-green-400' : 'text-muted'
          )} />
          <span className="text-muted">Food</span>
        </div>
      </div>

      {/* Health Score */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted">Health Score</span>
          <span className="text-sm font-medium text-fg">{health.score}/100</span>
        </div>
        <div className="w-full bg-surface rounded-full h-2">
          <div 
            className={cn(
              'h-2 rounded-full transition-all duration-300',
              health.status === 'healthy' && 'bg-green-500',
              health.status === 'needs_care' && 'bg-yellow-500',
              health.status === 'urgent' && 'bg-red-500'
            )}
            style={{ width: `${health.score}%` }}
          />
        </div>
      </div>

      {/* Issues */}
      {health.issues.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium text-fg">Care Needed:</h4>
          <div className="flex flex-wrap gap-2">
            {health.issues.map((issue, index) => (
              <span 
                key={index}
                className="text-xs bg-accent bg-opacity-20 text-accent px-2 py-1 rounded-full"
              >
                {issue}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Last Activity */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted">Last watered</span>
          <span className="text-fg">{formatRelativeTime(plant.lastWatered)}</span>
        </div>
        {plant.lastMessage && (
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-muted">Last message</span>
            <span className="text-fg">{formatRelativeTime(plant.lastMessage)}</span>
          </div>
        )}
        <div className="flex items-center justify-between text-sm mt-1">
          <span className="text-muted">Care streak</span>
          <span className="text-accent font-medium">{plant.careStreak} days</span>
        </div>
      </div>
    </div>
  );
}
