import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import ServiceCard from '../../components/servicecard';
import styles from './services.module.css';
import Breadcrumbs from '@/components/breadcrumbs';
import { FaUsers, FaRegClock } from 'react-icons/fa';

export const metadata: Metadata = {
  title: 'Car Detailing Services | Driveway Detailing in Cookeville, TN',
  description: 'Explore our professional car detailing services in Cookeville, TN. From exterior and interior detailing to headlight restoration, we offer customized packages for all vehicle sizes.',
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
    <div className={styles.pricingCard}>
      <table className={styles.pricingTable}>
        <thead>
          <tr>
            <th></th>
            {vehicleSizes.map((size) => (
              <th key={size}>{size}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {serviceTypes.map((type) => (
            <tr key={type}>
              <td>{type}</td>
              {vehicleSizes.map((size) => (
                <td key={size} className={styles.priceCell}>
                  ${prices[size.toLowerCase().replace('-', '_')][type.toLowerCase().replace(/ \+ /g, '_').replace(/ /g, '_')]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className={styles.fineprint}>
        * Prices may vary depending on vehicle condition, size, and specific customer requirements. 
        Please contact us for a personalized quote.
      </p>
      <p className={styles.fineprint}>
        * An additional fee may apply for expedited or same-day service requests, subject to availability.
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
  <div className={styles.addonCard}>
    <h4>{name}</h4>
    <p className={styles.price}>${price}</p>
    <p className={styles.description}>{description}</p>
  </div>
);

// New component for the referral program
const ReferralProgram: React.FC = () => (
  <div className={styles.referralContainer}>
    <div className={styles.referralCard}>
      <h4 className={styles.referralTitle}>
        <FaUsers style={{ marginRight: '10px' }} /> Share & Shine Referral Program
      </h4>
      <p className={styles.referralDescription}>
        Refer your friends and family to Driveway Detailing and earn rewards! The more people you refer, the bigger your discount.
      </p>
      <div className={styles.tierContainer}>
        <div className={styles.tierCard}>
          <h5>1 Referral</h5>
          <div className={styles.tierBenefit}>
            <p>You get: <span className={styles.discount}>15% OFF</span></p>
            <p>Friend gets: <span className={styles.discount}>15% OFF</span></p>
          </div>
        </div>
        <div className={styles.tierCard}>
          <h5>3 Referrals</h5>
          <div className={styles.tierBenefit}>
            <p>You get: <span className={styles.discount}>25% OFF</span></p>
            <p>Friends get: <span className={styles.discount}>15% OFF</span></p>
          </div>
        </div>
        <div className={styles.tierCard}>
          <h5>5 Referrals</h5>
          <div className={styles.tierBenefit}>
            <p>You get: <span className={styles.discount}>50% OFF</span></p>
            <p>Friends get: <span className={styles.discount}>15% OFF</span></p>
          </div>
        </div>
        <div className={styles.tierCard}>
          <h5>10+ Referrals</h5>
          <div className={styles.tierBenefit}>
            <p>You get: <span className={styles.freeService}>FREE SERVICE</span></p>
            <p>Friends get: <span className={styles.discount}>15% OFF</span></p>
          </div>
        </div>
      </div>
      <p className={styles.referralNote}>
        Contact us to learn more about our Share & Shine referral program or to redeem your rewards.
      </p>
    </div>
  </div>
);

// New component for expedited services
const ExpeditedServices: React.FC = () => (
  <div className={styles.expeditedContainer}>
    <div className={styles.expeditedCard}>
      <h4 className={styles.expeditedTitle}>
        <FaRegClock style={{ marginRight: '10px' }} /> Expedited Service Options
      </h4>
      <p className={styles.expeditedDescription}>
        Need your vehicle detailed quickly? We offer expedited service options for time-sensitive situations. 
        An additional fee may apply for same-day or next-day service requests, based on availability and scheduling.
      </p>
      <p className={styles.expeditedNote}>
        Please contact us directly at 931-303-4942 to inquire about expedited scheduling and associated fees.
      </p>
    </div>
  </div>
);

export default function Services() {
    const services = [
        {
          title: "Exterior Detailing",
          description: "Restore your vehicle's exterior to a showroom shine.",
          imageSrc: "/images/orange-wheel.jpg",
          features: [
            "Hand wash and dry",
            "Clay bar treatment",
            "Wheel and tire detailing",
            "Sealant application"
          ]
        },
        {
          title: "Interior Detailing",
          description: "Revitalize your vehicle's interior for a fresh, like-new feel.",
          imageSrc: "/images/blue-car-door.jpg",
          features: [
            "Wet and dry vacuuming",
            "Leather/upholstery conditioning",
            "Dashboard and trim detailing",
            "Odor elimination"
          ]
        },
        {
          title: "Headlight Restoration",
          description: "Improve visibility and enhance your car's appearance with our headlight restoration service.",
          imageSrc: "/images/headlight.jpg",
          features: [
            "Remove oxidation and yellowing",
            "UV-resistant clear coat application",
            "Improve nighttime visibility",
            "Restore clarity and shine"
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
        { name: "Headlight Restoration", price: 60, description: "Improve visibility and appearance of cloudy headlights" },
        { name: "Engine Bay Detailing", price: 50, description: "Deep clean and degrease your engine bay" }
    ];

    return (
        <div className={styles.servicesPage}>
            <Breadcrumbs />
            <div className={styles.servicesContainer}>
                <h1>Our Detailing Services</h1>
                {services.map((service, index) => (
                    <ServiceCard key={index} {...service} />
                ))}

                <h3>Detailing Packages and Pricing</h3>

                <div className={styles.pricingContainer}>
                    <PricingCard prices={pricingData} />
                </div>
                
                <ExpeditedServices />

                <h3>Add-on Services</h3>

                <div className={styles.addonsContainer}>
                    {addons.map((addon, index) => (
                        <AddonCard key={index} {...addon} />
                    ))}
                </div>

                <h3>Share & Shine Referral Program</h3>
                <ReferralProgram />

                <div className={styles.bookNowContainer}>
                    <Link href="https://squareup.com/appointments/book/o2ujm7vaufvhbc/LJEE0W1TJ1XZY/start" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className={styles.btnTertiary}>
                        Book Now
                    </Link>
                </div>
            </div>
        </div>
    );
}