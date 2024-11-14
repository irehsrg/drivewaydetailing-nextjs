import React from 'react';
import { Metadata } from 'next';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './contact.module.css';
import ContactForm from './contactform';
import Breadcrumbs from '@/components/breadcrumbs';

export const metadata: Metadata = {
  title: "Contact Cookeville's Best Auto Detailing | Mobile Car Detailing Services",
  description: "Get in touch with Cookeville's premier mobile car detailing service. Schedule your appointment today! Serving Cookeville, TN and surrounding areas with professional auto detailing services.",
};

const ContactSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "name": "Contact Driveway Detailing",
  "description": "Contact page for professional mobile car detailing services in Cookeville, TN",
  "mainEntity": {
    "@type": "LocalBusiness",
    "name": "Driveway Detailing",
    "image": "https://dwdetail.com/images/logo-transparent-png.png",
    "telephone": "931-303-4942",
    "email": "alex.drivewaydetail@gmail.com",
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
    "openingHours": "Mo-Su 08:00-18:00"
  }
};

export default function Contact() {
  return (
    <div className={styles.contactPage}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(ContactSchema)
        }}
      />
      
      <Breadcrumbs />
      
      <div className={styles.contactContainer}>
        <div className={styles.contactContent}>
          <section className={styles.contactInfo}>
            <h1><strong>Contact Cookeville's Premier Auto Detailing Service</strong></h1>
            
            <div className={styles.introSection}>
              <p>
                Ready to experience the best in <strong>mobile car detailing</strong>? 
                At <em>Driveway Detailing</em>, we bring professional auto detailing services 
                directly to your location in <mark>Cookeville, TN</mark> and surrounding areas. 
                Get in touch to schedule your appointment or learn more about our services.
              </p>
            </div>
            
            <div className={styles.contactDetails} itemScope itemType="https://schema.org/LocalBusiness">
              <div className={styles.contactItem}>
                <FaPhone color="#0094ff" aria-hidden="true" />
                <span>
                  <strong>Call or Text:</strong>{' '}
                  <a href="tel:9313034942" itemProp="telephone">
                    <em>931-303-4942</em>
                  </a>
                </span>
              </div>
              
              <div className={styles.contactItem}>
                <FaEnvelope color="#0094ff" aria-hidden="true" />
                <span>
                  <strong>Email:</strong>{' '}
                  <a href="mailto:alex.drivewaydetail@gmail.com" itemProp="email">
                    <em>alex.drivewaydetail@gmail.com</em>
                  </a>
                </span>
              </div>
              
              <div className={styles.contactItem}>
                <FaMapMarkerAlt color="#0094ff" aria-hidden="true" />
                <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                  <strong>Service Area:</strong>{' '}
                  <em>
                    <span itemProp="addressLocality">Cookeville</span>,{' '}
                    <span itemProp="addressRegion">TN</span>
                  </em>
                </span>
              </div>
            </div>

            <div className={styles.serviceAreas}>
              <h2>Areas We Serve</h2>
              <ul className={styles.areaList}>
                <li><strong>Cookeville</strong></li>
                <li><strong>Algood</strong></li>
                <li><strong>Baxter</strong></li>
                <li><strong>Gainesboro</strong></li>
                <li><strong>Monterey</strong></li>
                <li><strong>Sparta</strong></li>
                <li><strong>Crossville</strong></li>
                <li><strong>Livingston</strong></li>
              </ul>
            </div>

            <div className={styles.businessHours}>
              <h2>Business Hours</h2>
              <p itemProp="openingHours" content="Mo-Su 08:00-18:00">
                <strong>Open Daily:</strong> <em>8:00 AM - 6:00 PM</em>
              </p>
            </div>
          </section>

          <section className={styles.formSection}>
            <h2>Send Us a Message</h2>
            <ContactForm />
          </section>
        </div>
      </div>
    </div>
  );
}