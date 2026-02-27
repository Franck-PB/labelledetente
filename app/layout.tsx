import type { Metadata } from 'next'
import { Playfair_Display, Satisfy } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { StickyBookingCTA } from '@/components/ui/StickyBookingCTA'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const satisfy = Satisfy({
  subsets: ['latin'],
  variable: '--font-brand',
  display: 'swap',
  weight: '400',
})

export const metadata: Metadata = {
  title: {
    default: 'La Belle Détente — Massage à domicile en Savoie',
    template: '%s | La Belle Détente',
  },
  description:
    'Massage professionnel à domicile, en résidence de vacances ou en hôtel. Prestations haut de gamme en Maurienne et Savoie.',
  metadataBase: new URL('https://labelledetente.fr'),
  openGraph: {
    type: 'website',
    siteName: 'La Belle Détente',
    locale: 'fr_FR',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'La Belle Détente — Massage à domicile en Savoie',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className={`${playfair.variable} ${satisfy.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <StickyBookingCTA />
        <Analytics />
      </body>
    </html>
  )
}
