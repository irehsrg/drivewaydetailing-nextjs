'use client';

import React from 'react';
import Image from 'next/image';
import styles from './servicecard.module.css';

interface ServiceCardProps {
  title: string;
  description: string;
  imageSrc: string;
  features: string[];
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, imageSrc, features }) => {
  return (
    <div className={styles.serviceCard}>
      <div className={styles.serviceContent}>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.description}>{description}</p>
        <ul className={styles.featureList}>
          {features.map((feature, index) => (
            <li key={index} className={styles.featureItem}>
              <span className={styles.bullet}>•</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.serviceImage}>
        <div className={styles.imageWrapper}>
        <Image 
          src={imageSrc} 
          alt={title} 
          width={500}
          height={0}
          className={styles.image}
        />
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;