// /lib/seo/schema.ts

export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "name": "Cookeville's Best Auto Detailing", // Updated for SEO
  "image": "https://dwdetail.com/images/logo-transparent-png.png",
  "description": "Professional mobile car detailing services in Cookeville, TN. We come to you!",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Cookeville",
    "addressRegion": "TN",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "36.1628",
    "longitude": "-85.5016"
  },
  "url": "https://dwdetail.com",
  "telephone": "931-303-4942",
  "priceRange": "$$",
  "openingHours": "Mo-Su 08:00-18:00",
  "areaServed": [
    "Cookeville",
    "Algood",
    "Baxter",
    "Gainesboro",
    "Monterey",
    "Sparta",
    "Crossville",
    "Livingston"
  ],
  "serviceType": [
    "Mobile Car Detailing",
    "Interior Detailing",
    "Exterior Detailing",
    "Headlight Restoration"
  ],
  "sameAs": [
    "https://www.facebook.com/profile.php?id=61566483077685",
    "https://www.instagram.com/drivewaydetailing.tn/"
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "50"
  },
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Exterior Detailing",
        "price": "80.00",
        "priceCurrency": "USD"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Interior Detailing",
        "price": "90.00",
        "priceCurrency": "USD"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Complete Detailing",
        "price": "150.00",
        "priceCurrency": "USD"
      }
    }
  ]
});

export const getServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Mobile Car Detailing",
  "provider": {
    "@type": "AutoRepair",
    "name": "Cookeville's Best Auto Detailing"
  },
  "areaServed": {
    "@type": "State",
    "name": "Tennessee"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Car Detailing Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Exterior Detailing",
          "description": "Complete exterior car detailing service including hand wash, clay bar treatment, wheel cleaning, and paint protection",
          "price": "80.00",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Interior Detailing",
          "description": "Comprehensive interior detailing including vacuuming, steam cleaning, leather conditioning, and odor elimination",
          "price": "90.00",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Headlight Restoration",
          "description": "Professional headlight restoration to improve visibility and appearance",
          "price": "60.00",
          "priceCurrency": "USD"
        }
      }
    ]
  }
});

export const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://dwdetail.com${item.url}`
  }))
});