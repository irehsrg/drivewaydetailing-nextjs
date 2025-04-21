'use client';

import React from 'react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import styles from './gallery.module.css';
import Breadcrumbs from '@/components/breadcrumbs';

interface GalleryItem {
  src: string;
  alt: string;
  title: string;
  description: string;
  category: string;
}

const galleryItems: GalleryItem[] = [
  { 
    src: "/images/black-van.jpeg", 
    alt: "Professional exterior detailing results on black van",
    title: "Complete Van Detailing",
    description: "Professional exterior detailing service showing the transformation of a black van",
    category: "Exterior Detailing"
  },
  { 
    src: "/images/black-van2.jpeg", 
    alt: "Exterior detailing showcase of van transformation",
    title: "Exterior Detailing Excellence",
    description: "Deep interior cleaning and restoration of a van's wheels",
    category: "Exterior Detailing"
  },
  { 
    src: "/images/headlight-before-after.png", 
    alt: "Before and after headlight restoration comparison",
    title: "Headlight Restoration",
    description: "Dramatic transformation of cloudy headlights to crystal clear",
    category: "Headlight Restoration"
  },
  { 
    src: "/images/white-mustang.JPG", 
    alt: "Premium detailing service on white Ford Mustang",
    title: "Mustang Detail",
    description: "Complete exterior and interior detailing of a white Ford Mustang",
    category: "Exterior Detailing"
  },
  { 
    src: "/images/white-mustang2.JPG", 
    alt: "Premium detailing service on white Ford Mustang",
    title: "Mustang Detail",
    description: "",
    category: "Exterior Detailing"
  },
  { 
    src: "/images/white-mustang3.JPG", 
    alt: "Premium detailing service on white Ford Mustang",
    title: "Mustang Detail",
    description: "",
    category: "Exterior Detailing"
  },
  { 
    src: "/images/white-mustang6.JPG", 
    alt: "Premium detailing service on white Ford Mustang",
    title: "Mustang Detail",
    description: "",
    category: "Interior Detailing"
  },
  { 
    src: "/images/white-mustang7.JPG", 
    alt: "Premium detailing service on white Ford Mustang",
    title: "Mustang Detail",
    description: "",
    category: "Interior Detailing"
  },
  { 
    src: "/images/white-mustang5.JPG", 
    alt: "Premium detailing service on white Ford Mustang",
    title: "Mustang Detail",
    description: "",
    category: "Interior Detailing"
  },
  { 
    src: "/images/black-van3.jpeg", 
    alt: "",
    title: "",
    description: "",
    category: "Exterior Detailing"
  },
  { 
    src: "/images/black-van10.jpeg", 
    alt: "Premium detailing service on black Toyota Sienna",
    title: "Black Van Detail",
    description: "Complete exterior and interior detailing of a black Toyota Sienna",
    category: "Exterior Detailing"
  },
  { 
    src: "/images/black-van4.jpeg", 
    alt: "Premium detailing service on black Toyota Sienna",
    title: "Black Van Detail",
    description: "Complete exterior and interior detailing of a black Toyota Sienna",
    category: "Interior Detailing"
  },
  { 
    src: "/images/black-van5.jpeg", 
    alt: "Premium detailing service on black Toyota Sienna",
    title: "Black Van Detail",
    description: "Complete exterior and interior detailing of a black Toyota Sienna",
    category: "Exterior Detailing"
  },
  { 
    src: "/images/black-van6.jpeg",
    alt: "Premium detailing service on black Toyota Sienna",
    title: "Black Van Detail",
    description: "Complete exterior and interior detailing of a black Toyota Sienna",
    category: "Exterior Detailing"
  },
  { 
    src: "/images/black-van7.jpeg",
    alt: "Premium detailing service on black Toyota Sienna",
    title: "Black Van Detail",
    description: "Complete exterior and interior detailing of a black Toyota Sienna",
    category: "Exterior Detailing"
  },
  { 
    src: "/images/black-van8.jpeg",
    alt: "Premium detailing service on black Toyota Sienna",
    title: "Black Van Detail",
    description: "Complete exterior and interior detailing of a black Toyota Sienna",
    category: "Exterior Detailing"
  },
  { 
    src: "/images/black-van9.jpeg",
    alt: "Premium detailing service on black Toyota Sienna",
    title: "Black Van Detail",
    description: "Complete exterior and interior detailing of a black Toyota Sienna",
    category: "Exterior Detailing"
  },
  { 
    src: "/images/black-van11.jpeg",
    alt: "Premium detailing service on black Toyota Sienna",
    title: "Wheel Resoration",
    description: "",
    category: "Exterior Detailing"
  },
  { 
    src: "/images/black-van12.jpeg",
    alt: "Premium detailing service on black Toyota Sienna",
    title: "Wheel Resoration",
    description: "",
    category: "Exterior Detailing"
  },
  { 
    src: "/images/civic-clean.jpg",
    alt: "Premium detailing service on white Honda Civic",
    title: "Civic Detail",
    description: "Complete exterior and interior detailing of a silver Honda Civic",
    category: "Exterior Detailing"
  },
  { 
    src: "/images/engine_bay.jpeg",
    alt: "Premium engine bay detailing service",
    title: "Engine Bay Detail",
    description: "Engine bay detailing",
    category: "Engine Bay Detailing"
  },
  { 
    src: "/images/mustang-clean.jpg",
    alt: "Premium detailing service on black Ford Mustang",
    title: "Mustang Detail",
    description: "Complete exterior and interior detailing of a black Ford Mustang",
    category: "Exterior Detailing"
  }
];

export default function Gallery() {
  const gallerySchema = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Car Detailing Service Gallery - Cookeville, TN",
    "description": "View our portfolio of professional car detailing work in Cookeville, TN. Before and after transformations of interior detailing, exterior detailing, and headlight restoration services.",
    "image": galleryItems.map(item => ({
      "@type": "ImageObject",
      "contentUrl": `https://dwdetail.com${item.src}`,
      "name": item.title,
      "description": item.description,
      "caption": item.alt
    }))
  };

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <div className={styles.galleryPage}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(gallerySchema)
        }}
      />
      
      <Breadcrumbs />
      
      <div className={styles.galleryContainer}>
        <section className={styles.galleryHeader}>
          <h1><strong>Our Detailing Portfolio</strong></h1>
          <p className={styles.introText}>
            Explore our gallery of <strong>professional car detailing work</strong> in 
            <mark> Cookeville, TN</mark>. These images showcase our commitment to excellence 
            in <em>exterior detailing</em>, <em>interior restoration</em>, and 
            <em> headlight renewal</em> services.
          </p>
        </section>

        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={styles.myMasonryGrid}
          columnClassName={styles.myMasonryGridColumn}
        >
          {galleryItems.map((item, index) => (
            <article 
              key={index} 
              className={styles.galleryItem}
              itemScope
              itemType="https://schema.org/ImageObject"
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={0}
                  height={0}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className={styles.image}
                  itemProp="contentUrl"
                  loading={index < 4 ? "eager" : "lazy"}
                  quality={100}
                />
                <div className={styles.imageOverlay}>
                  <h3 itemProp="name">{item.title}</h3>
                  <p itemProp="description">{item.description}</p>
                  <span className={styles.category}>{item.category}</span>
                </div>
              </div>
            </article>
          ))}
        </Masonry>

        <section className={styles.galleryFooter}>
          <p>
            <strong>Ready to transform your vehicle?</strong> These results speak for themselves. 
            Contact us today to schedule your professional detailing service in Cookeville and 
            surrounding areas.
          </p>
        </section>
      </div>
    </div>
  );
}