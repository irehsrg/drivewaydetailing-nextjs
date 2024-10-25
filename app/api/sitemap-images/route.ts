import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    urlset: {
      url: [
        {
          loc: 'https://dwdetail.com',
          image: [
            {
              loc: 'https://dwdetail.com/images/logo-transparent-png.png',
              title: 'Driveway Detailing Logo',
              caption: 'Professional car detailing services in Cookeville, TN'
            },
            // Add more images
          ]
        }
      ]
    }
  });
}