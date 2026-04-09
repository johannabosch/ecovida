import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import '@fontsource/dm-sans/latin-400.css'
import '@fontsource/dm-sans/latin-500.css'
import '@fontsource/dm-sans/latin-600.css'
import '@fontsource/dm-sans/latin-700.css'
import '@fontsource/playfair-display/latin-400.css'
import '@fontsource/playfair-display/latin-500.css'
import '@fontsource/playfair-display/latin-600.css'
import '@fontsource/playfair-display/latin-700.css'
import './globals.css'
import { Providers } from './providers'
import { WhatsAppFloat } from '@/components/whatsapp-float'

export const metadata: Metadata = {
  title: 'Eco-Vida Designs | EcoArchitecture, EcoHome & EcoRetreat Design',
  description:
    'Designing refined, ecological spaces rooted in wellness and place. Completed work in Costa Rica, Hawaii, the United States, and Portugal. Ecoluxury and enhanced wellness living.',
  keywords: [
    'architecture',
    'ecological design',
    'Costa Rica',
    'Hawaii',
    'United States',
    'Portugal',
    'eco home',
    'eco resort',
    'eco retreat',
    'ecoluxury',
    'wellness design',
    'sustainable architecture',
    'luxury homes',
  ],
  authors: [{ name: 'Eco-Vida Designs' }],
  openGraph: {
    title: 'Eco-Vida Designs | EcoArchitecture & Enhanced Wellness Living',
    description:
      'Ecoluxury and enhanced wellness living. Work in Costa Rica, Hawaii, the United States, and Portugal.',
    type: 'website',
    locale: 'en_US',
  },
}

export const viewport: Viewport = {
  themeColor: '#2d4a3e',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Providers>
          {children}
          <WhatsAppFloat />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
