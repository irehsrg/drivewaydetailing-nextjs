import React from 'react';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import EmailPrompt from '../components/emailprompt';
import './globals.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'Driveway Detailing | Premium Mobile Car Detailing',
    template: '%s | Driveway Detailing'
  },
  description: 'Premium mobile car detailing services in Cookeville, TN',
  keywords: ['car detailing', 'mobile detailing', 'Cookeville', 'TN'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <EmailPrompt />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}