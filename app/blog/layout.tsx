import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Auto Detailing Blog | Driveway Detailing Cookeville',
  description: 'Explore the latest trends in auto detailing, car care tips. Expert advice from Cookeville\'s premier mobile detailing service.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}