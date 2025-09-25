import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Plant, PlantType } from './types';
import { PLANT_CARE_SCHEDULES } from './constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return 'Just now';
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  }
}

export function calculateNextWatering(plant: Plant): Date {
  const schedule = PLANT_CARE_SCHEDULES[plant.plantType as PlantType];
  const nextWatering = new Date(plant.lastWatered);
  nextWatering.setDate(nextWatering.getDate() + schedule.wateringFrequency);
  return nextWatering;
}

export function calculatePlantHealth(plant: Plant): {
  status: 'healthy' | 'needs_care' | 'urgent';
  score: number;
  issues: string[];
} {
  const now = new Date();
  const nextWatering = calculateNextWatering(plant);
  const daysSinceWatering = Math.floor((now.getTime() - plant.lastWatered.getTime()) / (1000 * 60 * 60 * 24));
  const schedule = PLANT_CARE_SCHEDULES[plant.plantType as PlantType];
  
  let score = 100;
  const issues: string[] = [];
  
  // Check watering
  if (daysSinceWatering > schedule.wateringFrequency + 2) {
    score -= 30;
    issues.push('Overdue for watering');
  } else if (daysSinceWatering > schedule.wateringFrequency) {
    score -= 15;
    issues.push('Needs watering soon');
  }
  
  // Check light (simplified - would need sensor data in real app)
  if (plant.needsLight) {
    score -= 20;
    issues.push('Needs more light');
  }
  
  // Check fertilizer (simplified)
  if (plant.needsFertilizer) {
    score -= 10;
    issues.push('Could use fertilizer');
  }
  
  let status: 'healthy' | 'needs_care' | 'urgent';
  if (score >= 80) {
    status = 'healthy';
  } else if (score >= 60) {
    status = 'needs_care';
  } else {
    status = 'urgent';
  }
  
  return { status, score, issues };
}

export function generatePlantName(plantType: PlantType): string {
  const names = {
    snake_plant: ['Slither', 'Viper', 'Serpent', 'Cobra', 'Python'],
    pothos: ['Ivy', 'Vine', 'Cascade', 'Flow', 'Drape'],
    monstera: ['Fenestra', 'Split', 'Hole-y', 'Swiss', 'Monsty'],
    fiddle_leaf_fig: ['Fiddle', 'Fig', 'Leaf', 'Verde', 'Ficus'],
    rubber_plant: ['Rubber', 'Flex', 'Bounce', 'Stretch', 'Elastic'],
    peace_lily: ['Peace', 'Lily', 'Serenity', 'Calm', 'Zen'],
    spider_plant: ['Spider', 'Web', 'Legs', 'Crawler', 'Spinner'],
    aloe_vera: ['Aloe', 'Vera', 'Heal', 'Soothe', 'Gel'],
    succulent: ['Succ', 'Chubby', 'Plump', 'Juicy', 'Thick'],
    cactus: ['Spike', 'Prickle', 'Thorn', 'Desert', 'Dry'],
  };
  
  const nameList = names[plantType] || ['Plant'];
  return nameList[Math.floor(Math.random() * nameList.length)];
}

export function generateQRCode(): string {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export function truncateAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}

export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^\+?[1-9]\d{1,14}$/;
  return phoneRegex.test(phone.replace(/\s+/g, ''));
}

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+${cleaned}`;
  }
  return phone;
}
