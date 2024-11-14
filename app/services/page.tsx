import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import ServiceCard from '../../components/servicecard';
import styles from './services.module.css';
import Breadcrumbs from '@/components/breadcrumbs';
import { getServiceSchema } from '@/lib/seo/schema';


export const metadata: Metadata = {
  title: "Professional Car Detailing Services Cookeville TN | Mobile Auto Detailing",
  description: "Expert car detailing services in Cookeville, TN. Professional exterior & interior detailing, ceramic coating, and headlight restoration. Mobile service available - we come to you! Competitive pricing starting from $80.",
};

interface PricingCardProps {
  prices: {
    [key: string]: {
      [key: string]: number;
    };
  };
}

const PricingCard: React.FC<PricingCardProps> = ({ prices }) => {
  const serviceTypes = ['Exterior + Interior', 'Exterior Only', 'Interior Only'];
  const vehicleSizes = ['Small', 'Mid-sized', 'Large'];

  return (
    <div className={styles.pricingCard} itemScope itemType="https://schema.org/PriceSpecification">
      <table className={styles.pricingTable}>
        <thead>
          <tr>
            <th scope="col"><strong>Vehicle Type</strong></th>
            {vehicleSizes.map((size) => (
              <th key={size} scope="col"><strong>{size}</strong></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {serviceTypes.map((type) => (
            <tr key={type}>
              <th scope="row"><em>{type}</em></th>
              {vehicleSizes.map((size) => (
                <td key={size} className={styles.priceCell}>
                  <strong>${prices[size.toLowerCase().replace('-', '_')][type.toLowerCase().replace(/ \+ /g, '_').replace(/ /g, '_')]}</strong>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className={styles.fineprint}>
        <em>* Prices may vary depending on vehicle condition, size, and specific requirements. 
        Contact us for a personalized quote.</em>
      </p>
    </div>
  );
};

interface AddonCardProps {
  name: string;
  price: number;
  description: string;
}

const AddonCard: React.FC<AddonCardProps> = ({ name, price, description }) => (
  <div className={styles.addonCard} itemScope itemType="https://schema.org/Offer">
    <h4 itemProp="name"><strong>{name}</strong></h4>
    <p className={styles.price}>
      <strong itemProp="price">${price}</strong>
      <meta itemProp="priceCurrency" content="USD" />
    </p>
    <p className={styles.description} itemProp="description"><em>{description}</em></p>
  </div>
);

export default function Services() {
  const services = [
    {
      title: "Professional Exterior Detailing",
      description: "Transform your vehicle's appearance with our comprehensive exterior detailing service in Cookeville.",
      imageSrc: "/images/orange-wheel.jpg",
      features: [
        "Thorough hand wash and dry",
        "Professional clay bar treatment",
        "Complete wheel and tire detailing",
        "Paint protection sealant application"
      ]
    },
    {
      title: "Interior Detailing Excellence",
      description: "Experience a complete interior transformation with our professional detailing service.",
      imageSrc: "/images/blue-car-door.jpg",
      features: [
        "Deep cleaning vacuum service",
        "Premium leather/upholstery conditioning",
        "Comprehensive dashboard and trim detailing",
        "Professional odor elimination treatment"
      ]
    },
    {
      title: "Expert Headlight Restoration",
      description: "Restore clarity and improve safety with our professional headlight restoration service.",
      imageSrc: "/images/headlight.jpg",
      features: [
        "Professional oxidation removal",
        "UV-resistant protective coating",
        "Enhanced nighttime visibility",
        "Long-lasting clarity restoration"
      ]
    }
  ];

  const pricingData = {
    small: {
      exterior_interior: 150,
      exterior_only: 80,
      interior_only: 90
    },
    mid_sized: {
      exterior_interior: 220,
      exterior_only: 110,
      interior_only: 120
    },
    large: {
      exterior_interior: 280,
      exterior_only: 140,
      interior_only: 160
    }
  };

  const addons = [
    {
      name: "Professional Headlight Restoration",
      price: 60,
      description: "Restore clarity and safety with our professional headlight restoration service"
    },
    {
      name: "Premium Engine Bay Detailing",
      price: 50,
      description: "Professional engine bay cleaning and protection service"
    }
  ];

  return (
    <div className={styles.servicesPage}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getServiceSchema())
        }}
      />
      
      <Breadcrumbs />
      
      <div className={styles.servicesContainer}>
        <h1><strong>Professional Auto Detailing Services in Cookeville</strong></h1>
        
        <section>
          <p className={styles.introText}>
            <strong>Welcome to Cookeville's premier mobile detailing service.</strong> At Driveway Detailing, 
            we bring professional car detailing services directly to your location. Our comprehensive services 
            include <mark>exterior detailing</mark>, <mark>interior detailing</mark>, and 
            <mark>headlight restoration</mark>, all delivered with exceptional attention to detail.
          </p>
        </section>

        {services.map((service, index) => (
          <section key={index} itemScope itemType="https://schema.org/Service">
            <ServiceCard {...service} />
          </section>
        ))}

        <section>
          <h2><strong>Detailing Packages and Pricing</strong></h2>
          <div className={styles.pricingContainer}>
            <PricingCard prices={pricingData} />
          </div>
        </section>

        <section>
          <h2><strong>Premium Add-on Services</strong></h2>
          <div className={styles.addonsContainer}>
            {addons.map((addon, index) => (
              <AddonCard key={index} {...addon} />
            ))}
          </div>
        </section>

        <section className={styles.bookNowContainer}>
          <Link 
            href="https://squareup.com/appointments/book/o2ujm7vaufvhbc/LJEE0W1TJ1XZY/start" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.btnTertiary}
          >
            <strong>Schedule Your Detailing Service</strong>
          </Link>
        </section>
      </div>
    </div>
  );
}