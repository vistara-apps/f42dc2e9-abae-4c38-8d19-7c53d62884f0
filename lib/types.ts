export interface User {
  userId: string;
  farcasterId?: string;
  phoneNumber: string;
  subscriptionStatus: 'active' | 'inactive' | 'trial';
  createdAt: Date;
}

export interface Plant {
  plantId: string;
  userId: string;
  qrCodeId: string;
  name: string;
  plantType: string;
  personalityType: string;
  mood: 'happy' | 'thirsty' | 'sleepy' | 'excited' | 'grumpy';
  lastWatered: Date;
  needsWater: boolean;
  needsLight: boolean;
  needsFertilizer: boolean;
  createdAt: Date;
  lastMessage?: Date;
  careStreak: number;
}

export interface Personality {
  personalityId: string;
  name: string;
  description: string;
  style: 'chill' | 'energetic' | 'sassy' | 'wise' | 'dramatic';
  solanaThemeElements: string[];
  messageTemplates: {
    watering: string[];
    light: string[];
    fertilizer: string[];
    greeting: string[];
    celebration: string[];
  };
}

export interface Message {
  messageId: string;
  plantId: string;
  userId: string;
  content: string;
  type: 'care_reminder' | 'greeting' | 'celebration' | 'status_update';
  sentAt: Date;
  delivered: boolean;
}

export interface Subscription {
  subscriptionId: string;
  userId: string;
  plan: 'basic' | 'premium';
  status: 'active' | 'cancelled' | 'past_due';
  plantLimit: number;
  currentPlants: number;
  nextBilling: Date;
  createdAt: Date;
}

export type PlantType = 
  | 'snake_plant'
  | 'pothos'
  | 'monstera'
  | 'fiddle_leaf_fig'
  | 'rubber_plant'
  | 'peace_lily'
  | 'spider_plant'
  | 'aloe_vera'
  | 'succulent'
  | 'cactus';

export interface PlantCareSchedule {
  plantType: PlantType;
  wateringFrequency: number; // days
  lightRequirement: 'low' | 'medium' | 'high';
  fertilizerFrequency: number; // days
  difficulty: 'easy' | 'medium' | 'hard';
}
