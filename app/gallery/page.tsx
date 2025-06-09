'use client';

import React from 'react';
import Image from 'next/image';
import Masonry from 'react-masonry-css';
import styles from './gallery.module.css';
import Breadcrumbs from '@/components/breadcrumbs';

interface GalleryItem {
  src: string;
  alt: string;
}

const galleryItems: GalleryItem[] = [
  { src: "/images/black-van.jpeg", alt: "Exterior detailing result" },
  { src: "/images/black-van2.jpeg", alt: "Interior detailing showcase" },
  { src: "/images/black-van3.jpeg", alt: "Headlight restoration before and after" },
  { src: "/images/black-van4.jpeg", alt: "Paint correction process" },
  { src: "/images/black-van5.jpeg", alt: "Wheel detailing close-up" },
  { src: "/images/black-van6.jpeg", alt: "Full car transformation" },
  { src: "/images/black-van7.jpeg", alt: "Engine bay cleaning" },
  { src: "/images/black-van8.jpeg", alt: "Ceramic coating application" },
  { src: "/images/black-van9.jpeg", alt: "Ceramic coating application" },
  { src: "/images/black-van10.jpeg", alt: "Ceramic coating application" },
  { src: "/images/black-van11.jpeg", alt: "Ceramic coating application" },
  { src: "/images/black-van12.jpeg", alt: "Ceramic coating application" },
  { src: "/images/headlight-before-after.png", alt: "Headlight restoration comparison" },
  { src: "/images/white-mustang.JPG", alt: "White Mustang detailing" },
  { src: "/images/white-mustang2.JPG", alt: "White Mustang detailing" },
  { src: "/images/white-mustang3.JPG", alt: "White Mustang detailing" },
  { src: "/images/white-mustang4.JPG", alt: "White Mustang detailing" },
  { src: "/images/white-mustang5.JPG", alt: "White Mustang detailing" },
  { src: "/images/white-mustang6.JPG", alt: "White Mustang detailing" },
  { src: "/images/white-mustang7.JPG", alt: "White Mustang detailing" },
  { src: "/images/white-mustang8.JPG", alt: "White Mustang detailing" },
  { src: "/images/white-mustang8.JPG", alt: "White Mustang detailing" },
  { src: "/images/bm1.JPG", alt: "Black Mustang paint correction and ceramic coating" },
  { src: "/images/bm2.JPG", alt: "Black Mustang paint correction and ceramic coating" },
  { src: "/images/bm3.JPG", alt: "Black Mustang paint correction and ceramic coating" },
  { src: "/images/bf1.jpeg", alt: "Before/After truck detailing" },
  { src: "/images/bf2.jpeg", alt: "Before/After truck detailing" },
  { src: "/images/bf3.jpeg", alt: "Before/After truck detailing" },
  { src: "/images/t1.JPG", alt: "Truck detailing" },
  { src: "/images/t2.JPG", alt: "Truck detailing" },
  { src: "/images/t3.JPG", alt: "Truck detailing" },
  { src: "/images/t4.JPG", alt: "Truck detailing" }
];

const breakpointColumnsObj = {
  default: 3,
  1100: 2,
  700: 1
};

export default function Gallery() {
  return (
    <div className={styles.galleryPage}>
      <Breadcrumbs />
      <div className={styles.galleryContainer}>
        <h1>Our Work</h1>
        <Masonry
          breakpointCols={breakpointColumnsObj}
          className={styles.myMasonryGrid}
          columnClassName={styles.myMasonryGridColumn}
        >
          {galleryItems.map((item, index) => (
            <div key={index} className={styles.galleryItem}>
              <div style={{ position: 'relative', width: '100%' }}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={0}
                  height={0}
                  layout='responsive'
                  style={{ objectFit: 'cover' }}
                  quality={100}
                />
              </div>
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
}