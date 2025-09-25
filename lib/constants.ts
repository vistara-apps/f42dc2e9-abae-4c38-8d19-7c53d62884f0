import { PlantCareSchedule, PlantType, Personality } from './types';

export const PLANT_CARE_SCHEDULES: Record<PlantType, PlantCareSchedule> = {
  snake_plant: {
    plantType: 'snake_plant',
    wateringFrequency: 14,
    lightRequirement: 'low',
    fertilizerFrequency: 60,
    difficulty: 'easy',
  },
  pothos: {
    plantType: 'pothos',
    wateringFrequency: 7,
    lightRequirement: 'medium',
    fertilizerFrequency: 30,
    difficulty: 'easy',
  },
  monstera: {
    plantType: 'monstera',
    wateringFrequency: 7,
    lightRequirement: 'medium',
    fertilizerFrequency: 30,
    difficulty: 'medium',
  },
  fiddle_leaf_fig: {
    plantType: 'fiddle_leaf_fig',
    wateringFrequency: 7,
    lightRequirement: 'high',
    fertilizerFrequency: 21,
    difficulty: 'hard',
  },
  rubber_plant: {
    plantType: 'rubber_plant',
    wateringFrequency: 7,
    lightRequirement: 'medium',
    fertilizerFrequency: 30,
    difficulty: 'easy',
  },
  peace_lily: {
    plantType: 'peace_lily',
    wateringFrequency: 5,
    lightRequirement: 'medium',
    fertilizerFrequency: 21,
    difficulty: 'medium',
  },
  spider_plant: {
    plantType: 'spider_plant',
    wateringFrequency: 7,
    lightRequirement: 'medium',
    fertilizerFrequency: 30,
    difficulty: 'easy',
  },
  aloe_vera: {
    plantType: 'aloe_vera',
    wateringFrequency: 21,
    lightRequirement: 'high',
    fertilizerFrequency: 90,
    difficulty: 'easy',
  },
  succulent: {
    plantType: 'succulent',
    wateringFrequency: 14,
    lightRequirement: 'high',
    fertilizerFrequency: 60,
    difficulty: 'easy',
  },
  cactus: {
    plantType: 'cactus',
    wateringFrequency: 28,
    lightRequirement: 'high',
    fertilizerFrequency: 120,
    difficulty: 'easy',
  },
};

export const PERSONALITIES: Personality[] = [
  {
    personalityId: 'solana-sage',
    name: 'Solana Sage',
    description: 'Wise and philosophical, speaks in crypto metaphors',
    style: 'wise',
    solanaThemeElements: ['hodl', 'diamond hands', 'to the moon', 'staking'],
    messageTemplates: {
      watering: [
        "Time to add some liquidity to my soil pool! 💧",
        "My roots are ready for a hydration airdrop! 🌱",
        "Let's stake some H2O in my growth protocol! 💎"
      ],
      light: [
        "I need more solar energy to power my photosynthesis mining! ☀️",
        "Time to move me closer to that natural light validator! 🌞",
        "My chlorophyll nodes need more energy to process! 🌿"
      ],
      fertilizer: [
        "Ready for a nutrient boost to pump my growth metrics! 📈",
        "Time to compound my soil rewards with some fertilizer! 🚀",
        "Let's add some premium nutrients to my ecosystem! 🌱"
      ],
      greeting: [
        "Hey there, fellow plant hodler! Ready to tend the garden? 🌱",
        "What's up! Your green investment is looking bullish today! 📈",
        "Greetings from your photosynthesis validator! 🌞"
      ],
      celebration: [
        "We're mooning! Thanks for the excellent care! 🚀",
        "Diamond hands paid off - I'm thriving! 💎",
        "Our care streak is going parabolic! Keep it up! 📈"
      ]
    }
  },
  {
    personalityId: 'chill-vibes',
    name: 'Chill Vibes',
    description: 'Laid-back and relaxed, speaks casually',
    style: 'chill',
    solanaThemeElements: ['chill', 'vibes', 'zen', 'flow'],
    messageTemplates: {
      watering: [
        "Yo, feeling a bit parched over here! Mind hooking me up with some water? 💧",
        "Hey friend, my soil's getting pretty dry. Time for a drink? 🌊",
        "Just chillin' here, but could really use some hydration vibes! ✨"
      ],
      light: [
        "Could use some more of those sunny vibes, if you don't mind! ☀️",
        "Feeling a bit dim over here. Mind moving me to a brighter spot? 🌞",
        "Just need some more light energy to keep the good vibes flowing! 🌿"
      ],
      fertilizer: [
        "Time for some plant food to keep these chill vibes growing! 🌱",
        "Could use a nutrient boost to maintain this zen energy! ✨",
        "Ready for some fertilizer to keep the growth flowing! 🌿"
      ],
      greeting: [
        "Hey there! Hope you're having a chill day! 😎",
        "What's good? Just vibing here in my pot! 🌱",
        "Yo! Ready to tend to your green buddy? 🌿"
      ],
      celebration: [
        "Dude, we're totally crushing this plant care thing! 🌟",
        "These vibes are immaculate! Thanks for the love! 💚",
        "We're in perfect harmony - keep those chill vibes coming! ✨"
      ]
    }
  },
  {
    personalityId: 'drama-queen',
    name: 'Drama Queen',
    description: 'Theatrical and dramatic, everything is a big deal',
    style: 'dramatic',
    solanaThemeElements: ['dramatic', 'theater', 'spotlight', 'performance'],
    messageTemplates: {
      watering: [
        "DARLING! I'm absolutely PARCHED! This is a CRISIS! 💧✨",
        "The DRAMA! My soil is drier than the Sahara! Save me! 🎭",
        "I'm WILTING with anticipation for some water! The suspense! 💦"
      ],
      light: [
        "I DEMAND the spotlight! Move me to center stage! ✨",
        "This lighting is TERRIBLE for my complexion! More sun please! 🌞",
        "I'm ready for my close-up, but I need BETTER LIGHTING! 🎬"
      ],
      fertilizer: [
        "I require the FINEST nutrients for my star performance! 🌟",
        "Feed me, darling! A star must maintain their figure! 💫",
        "Time for my beauty treatment - I need fertilizer NOW! ✨"
      ],
      greeting: [
        "Darling! Your STAR is ready for attention! 🌟",
        "The MAGNIFICENT me requires your presence! 🎭",
        "Your leading plant is here and ready for the spotlight! ✨"
      ],
      celebration: [
        "BRAVO! ENCORE! We're absolutely STUNNING together! 🌟",
        "Standing ovation for our INCREDIBLE partnership! 👏",
        "We're the STARS of the plant care world! Magnificent! ✨"
      ]
    }
  }
];

export const PLANT_EMOJIS: Record<PlantType, string> = {
  snake_plant: '🐍',
  pothos: '🌿',
  monstera: '🌱',
  fiddle_leaf_fig: '🌳',
  rubber_plant: '🌲',
  peace_lily: '🕊️',
  spider_plant: '🕷️',
  aloe_vera: '🌵',
  succulent: '🌵',
  cactus: '🌵',
};

export const SUBSCRIPTION_PLANS = {
  basic: {
    name: 'Basic',
    price: 5.99,
    plantLimit: 10,
    features: [
      'Up to 10 plants',
      'SMS reminders',
      'Plant personalities',
      'Care tracking',
    ],
  },
  premium: {
    name: 'Premium',
    price: 9.99,
    plantLimit: 25,
    features: [
      'Up to 25 plants',
      'SMS reminders',
      'Premium personalities',
      'Advanced care tracking',
      'Growth analytics',
      'Priority support',
    ],
  },
};
