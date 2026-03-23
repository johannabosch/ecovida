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

export const metadata: Metadata = {
  title: 'Ecovida | Ecological Architecture & Design Studio',
  description: 'Designing refined, ecological spaces rooted in wellness and place. Luxury residential and retreat design in Costa Rica.',
  keywords: ['architecture', 'ecological design', 'Costa Rica', 'luxury homes', 'sustainable architecture', 'wellness design'],
  authors: [{ name: 'Ecovida Design Studio' }],
  openGraph: {
    title: 'Ecovida | Ecological Architecture & Design Studio',
    description: 'Designing refined, ecological spaces rooted in wellness and place.',
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
        {children}
        <Analytics />
      </body>
    </html>
  )
}
