import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Detailing Blog | Auto Detailing Tips & Advice',
  description: 'Professional car detailing tips, maintenance advice, and industry insights from Cookeville\'s premier mobile detailing service. Learn how to keep your vehicle looking its best.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}