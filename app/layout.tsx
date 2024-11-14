import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import EmailPrompt from '../components/emailprompt';
import './globals.css';
import { Metadata } from 'next';
import { getOrganizationSchema, getServiceSchema } from '../lib/seo/schema';

export const metadata: Metadata = {
  metadataBase: new URL('https://dwdetail.com'),
  title: {
    default: "Cookeville's Best Auto Detailing - We Come to You! | Driveway Detailing",
    template: '%s | Cookeville Auto Detailing Services'
  },
  description: "Professional mobile auto detailing in Cookeville, TN. Expert car detailing services that come to your location. Serving Cookeville and surrounding areas with top-rated interior & exterior detailing services.",
  keywords: [
    'auto detailing Cookeville',
    'mobile car detailing',
    'car detailing TN',
    'mobile detailing service',
    'car wash Cookeville',
    'exterior detailing',
    'interior detailing',
    'headlight restoration',
    'ceramic coating',
    'professional car cleaning',
    'Cookeville car detailing',
    'Tennessee auto detailing'
  ],
  authors: [{ name: 'Alex Joines' }],
  creator: 'Alex Joines',
  publisher: "Cookeville's Best Auto Detailing",
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
    siteName: "Cookeville's Best Auto Detailing",
    title: "Cookeville's Best Auto Detailing - We Come to You!",
    description: "Professional mobile auto detailing in Cookeville, TN. From basic wash to premium detailing packages, we bring the car wash to you! Servicing Cookeville, Algood, Baxter, and surrounding areas.",
    images: [
      {
        url: '/images/logo-transparent-png.png',
        width: 1200,
        height: 630,
        alt: "Cookeville's Best Auto Detailing - Mobile Car Detailing Services",
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Cookeville's Best Auto Detailing - Mobile Services",
    description: "Professional mobile car detailing in Cookeville, TN. We come to you!",
    images: ['/images/logo-transparent-png.png'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
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
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      getOrganizationSchema(),
      getServiceSchema()
    ]
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(combinedSchema)
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