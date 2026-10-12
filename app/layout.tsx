import type { Metadata, Viewport } from 'next';
import { Inter, Instrument_Sans } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const instrument = Instrument_Sans({ subsets: ['latin'], variable: '--font-instrument', display: 'swap' });

export const metadata: Metadata = {
  title: 'ADP Toiture SA · Ferblanterie, couverture et étanchéité à Genève',
  description:
    'ADP Toiture SA, entreprise de toiture à Genève : ferblanterie, couverture, étanchéité et fabrication sur mesure pour particuliers et professionnels.',
};

export const viewport: Viewport = {
  themeColor: '#0E171C',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // "js" arms the entrance and reveal animations; SiteEffects runs them.
    <html lang="fr" className={`js ${inter.variable} ${instrument.variable}`}>
      <body>{children}</body>
    </html>
  );
}
