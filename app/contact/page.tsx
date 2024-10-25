import React from 'react';
import { Metadata } from 'next';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import styles from './contact.module.css';
import ContactForm from './contactform';
import Breadcrumbs from '@/components/breadcrumbs';

export const metadata: Metadata = {
  title: 'Contact Driveway Detailing | Car Detailing in Cookeville, TN',
  description: 'Contact Driveway Detailing for professional car detailing services in Cookeville, TN. Schedule an appointment or ask questions about our exterior and interior detailing services.',
};

export default function Contact() {
  return (
    <div className={styles.contactPage}>
      <Breadcrumbs />
      <div className={styles.contactContainer}>
        <div className={styles.contactContent}>
          <div className={styles.contactInfo}>
            <h1>Contact Us</h1>
            <p>We'd love to hear from you! Feel free to reach out with any questions or to schedule a detailing appointment.</p>
            <div className={styles.contactDetails}>
              <div className={styles.contactItem}>
                <FaPhone color="#0094ff" />
                <span>931-303-4942</span>
              </div>
              <div className={styles.contactItem}>
                <FaEnvelope color="#0094ff" />
                <span>alex.drivewaydetail@gmail.com</span>
              </div>
              <div className={styles.contactItem}>
                <FaMapMarkerAlt color="#0094ff" />
                <span>Cookeville, TN</span>
              </div>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}