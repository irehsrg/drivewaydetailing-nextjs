import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import EmailPrompt from '../components/emailprompt';
import './globals.css';
import { Metadata } from 'next';
import { getOrganizationSchema } from '../lib/seo/schema';

export const metadata: Metadata = {
  metadataBase: new URL('https://dwdetail.com'),
  title: {
    default: 'Driveway Detailing | Premium Mobile Car Detailing in Cookeville, TN',
    template: '%s | Driveway Detailing'
  },
  description: 'Professional mobile car detailing services in Cookeville, TN. Offering exterior & interior detailing, headlight restoration, and more. We come to you!',
  keywords: ['car detailing', 'mobile detailing', 'Cookeville', 'TN', 'auto detailing', 'car wash', 'headlight restoration'],
  authors: [{ name: 'Alex Joines' }],
  creator: 'Alex Joines',
  publisher: 'Driveway Detailing',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://dwdetail.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://dwdetail.com',
    siteName: 'Driveway Detailing',
    title: 'Driveway Detailing | Premium Mobile Car Detailing in Cookeville, TN',
    description: 'Professional mobile car detailing services in Cookeville, TN. We bring the car wash to you!',
    images: [
      {
        url: '/images/logo-transparent-png.png',
        width: 1200,
        height: 630,
        alt: 'Driveway Detailing Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Driveway Detailing | Mobile Car Detailing',
    description: 'Professional mobile car detailing services in Cookeville, TN',
    images: ['/images/logo-transparent-png.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'qeOFX5ecvFwvxSuyqW3SkrsuLlr_3AizTM4MT2I5Tp',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getOrganizationSchema())
          }}
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#0094ff" />
        <meta name="theme-color" content="#0094ff" />
      </head>
      <body>
        <Navbar />
        <EmailPrompt />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}