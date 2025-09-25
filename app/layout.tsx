import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ThemeProvider } from './components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PlantaPal - Your Plants Are Texting You!',
  description: 'Get personalized care nudges from your houseplants with SMS reminders and Solana-themed personalities.',
  keywords: ['plants', 'care', 'SMS', 'reminders', 'houseplants', 'Base', 'miniapp'],
  authors: [{ name: 'PlantaPal Team' }],
  openGraph: {
    title: 'PlantaPal - Your Plants Are Texting You!',
    description: 'Get personalized care nudges from your houseplants with SMS reminders and Solana-themed personalities.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PlantaPal - Your Plants Are Texting You!',
    description: 'Get personalized care nudges from your houseplants with SMS reminders and Solana-themed personalities.',
  },
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
  themeColor: '#2dd4bf',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Providers>
            <div className="min-h-screen bg-bg">
              {children}
            </div>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
