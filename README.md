# PlantaPal - Your Plants Are Texting You! 🌱

A Base Mini App where houseplants send personalized SMS care reminders with unique Solana-themed personalities.

## Features

- **Personalized Care Nudges**: Plants text you with timely reminders for watering, light, and feeding
- **QR Code Onboarding**: Scan QR codes to instantly add plants to your collection
- **Solana-Themed Personalities**: Each plant has a unique personality (Solana Sage, Chill Vibes, Drama Queen)
- **Scalable Plant Management**: Manage up to 10 plants with the basic subscription
- **Base Mini App Integration**: Built with OnchainKit for seamless Base ecosystem integration

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via OnchainKit)
- **Styling**: Tailwind CSS with custom design system
- **SMS**: Twilio API integration
- **QR Codes**: QR code generation and scanning
- **TypeScript**: Full type safety throughout

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd plantapal
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Fill in your API keys:
   - `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Get from Coinbase Developer Platform
   - `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`: Get from Twilio

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── AppShell.tsx    # Main app layout
│   ├── PlantCard.tsx   # Plant display component
│   ├── QRScanner.tsx   # QR code scanning
│   ├── OnboardingFlow.tsx # User onboarding
│   └── ChatBubble.tsx  # Message display
├── pages/              # App routes
│   ├── page.tsx        # Home dashboard
│   ├── plants/         # Plant management
│   ├── add-plant/      # Add new plants
│   └── profile/        # User profile
lib/
├── types.ts            # TypeScript definitions
├── constants.ts        # App constants and data
└── utils.ts            # Utility functions
```

## Key Components

### Plant Personalities

Each plant can have one of three personalities:

1. **Solana Sage**: Wise and philosophical, speaks in crypto metaphors
2. **Chill Vibes**: Laid-back and relaxed, casual communication style
3. **Drama Queen**: Theatrical and dramatic, everything is a big deal

### Care System

Plants track:
- Watering schedule based on plant type
- Light requirements
- Fertilizer needs
- Health score and care streaks
- Mood and personality-driven messages

### Theme System

Supports multiple themes:
- **PlantaPal** (default): Warm social theme with coral accents
- **Celo**: Black background with yellow accents
- **Solana**: Dark purple with magenta accents
- **Base**: Dark blue with Base blue accents
- **Coinbase**: Navy blue with Coinbase blue accents

## SMS Integration

The app uses Twilio to send SMS messages from plants to users:

```typescript
// Example plant message
"Hey! Brad the Snake Plant here... feeling a bit parched. 
Time to add some liquidity to my soil pool! 💧"
```

## Subscription Model

- **Basic Plan**: $5.99/month for up to 10 plants
- **Premium Plan**: $9.99/month for up to 25 plants with advanced features

## Development

### Adding New Plant Types

1. Add to `PlantType` in `lib/types.ts`
2. Add care schedule to `PLANT_CARE_SCHEDULES` in `lib/constants.ts`
3. Add emoji to `PLANT_EMOJIS`

### Adding New Personalities

1. Create personality object in `PERSONALITIES` array
2. Define message templates for different scenarios
3. Add personality selection in add-plant flow

### Customizing Themes

Themes are defined in `app/globals.css` using CSS variables:

```css
:root {
  --color-bg: hsl(180, 30%, 15%);
  --color-fg: hsl(0, 0%, 95%);
  --color-accent: hsl(0, 70%, 65%);
  /* ... */
}
```

## Deployment

The app is designed to be deployed on Vercel or similar platforms that support Next.js.

1. **Build the app**
   ```bash
   npm run build
   ```

2. **Set environment variables** in your deployment platform

3. **Deploy** using your preferred method

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For support, please open an issue on GitHub or contact the development team.

---

Built with ❤️ for the Base ecosystem and plant lovers everywhere! 🌱
