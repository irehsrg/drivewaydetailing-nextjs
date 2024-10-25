export const getAggregateRatingSchema = () => ({
    "@context": "https://schema.org",
    "@type": "AggregateRating",
    "itemReviewed": {
      "@type": "AutoRepair",
      "name": "Driveway Detailing",
      "image": "https://dwdetail.com/images/logo-transparent-png.png"
    },
    "ratingValue": "4.9",
    "bestRating": "5",
    "worstRating": "1",
    "ratingCount": "50"
  });