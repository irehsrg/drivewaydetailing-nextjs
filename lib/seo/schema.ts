export const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    "name": "Driveway Detailing",
    "image": "https://dwdetail.com/images/logo-transparent-png.png",
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
    "areaServed": ["Cookeville", "Algood", "Baxter", "Gainesboro", "Monterey", "Sparta", "Crossville", "Livingston"],
    "serviceType": ["Car Detailing", "Interior Detailing", "Exterior Detailing", "Headlight Restoration"]
  });
  
  export const getServiceSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Car Detailing",
    "provider": {
      "@type": "AutoRepair",
      "name": "Driveway Detailing"
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
            "description": "Complete exterior car detailing service"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Interior Detailing",
            "description": "Complete interior car detailing service"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Headlight Restoration",
            "description": "Professional headlight restoration service"
          }
        }
      ]
    }
  });
  