import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Car Detailing Gallery | Driveway Detailing in Cookeville, TN',
  description: 'View our gallery of professional car detailing results. See the before and after transformations of exterior and interior detailing, headlight restoration, and more.',
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>;
}