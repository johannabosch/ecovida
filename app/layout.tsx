import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import '@fontsource/dm-sans/latin-400.css'
import '@fontsource/dm-sans/latin-600.css'
import '@fontsource/playfair-display/latin-400.css'
import '@fontsource/playfair-display/latin-600.css'
import './globals.css'
import { Providers } from './providers'
import { WhatsAppFloat } from '@/components/whatsapp-float'
import { SEO_DESCRIPTION, SITE_NAME, SITE_URL } from '@/lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | EcoArchitecture, EcoHome & EcoRetreat Design`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SEO_DESCRIPTION,
  keywords: [
    'ecological architecture',
    'eco architecture',
    'EcoArch',
    'eco home',
    'eco resort',
    'eco retreat',
    'ecoluxury',
    'wellness design',
    'sustainable architecture',
    'passive tropical design',
    'post-and-beam',
    'off-grid design',
    'Costa Rica architect',
    'Hawaii architect',
    'Portugal eco design',
    'luxury eco homes',
    'wellness retreat design',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${SITE_NAME} | EcoArchitecture & Enhanced Wellness Living`,
    description: SEO_DESCRIPTION,
    type: 'website',
    locale: 'en_US',
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [{ url: '/logo.png', width: 800, height: 240, alt: SITE_NAME }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | EcoArchitecture & Wellness Design`,
    description: SEO_DESCRIPTION,
    images: ['/logo.png'],
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
