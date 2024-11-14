import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import { FaUser, FaQuestionCircle, FaClipboardList, FaHandshake, FaPhoneAlt } from 'react-icons/fa';
import styles from './about.module.css';
import Breadcrumbs from '@/components/breadcrumbs';

export const metadata: Metadata = {
  title: "About Cookeville's Best Auto Detailing | Professional Car Detailer",
  description: "Meet Alex Joines, Cookeville's trusted mobile car detailing expert. Discover our commitment to excellence in auto detailing, our professional background, and why we're Cookeville's choice for premium car care services.",
};

interface SectionCardProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ icon, title, children }) => (
  <div className={styles.sectionCard} itemScope itemType="https://schema.org/Article">
    <h2 itemProp="name">
      {icon}
      <span>{title}</span>
    </h2>
    <div itemProp="articleBody">{children}</div>
  </div>
);

export default function About() {
  // Schema for the about page
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Driveway Detailing",
    "description": "Professional mobile car detailing services in Cookeville, TN",
    "mainEntity": {
      "@type": "Person",
      "name": "Alex Joines",
      "jobTitle": "Professional Car Detailer",
      "description": "Founder and operator of Driveway Detailing, providing expert mobile car detailing services in Cookeville, TN",
      "image": "https://dwdetail.com/images/profile-pic.jpg",
      "areaServed": "Cookeville, TN"
    }
  };

  return (
    <div className={styles.aboutPage}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(aboutPageSchema)
        }}
      />
      
      <Breadcrumbs />
      
      <div className={styles.aboutHero}>
        <h1>About <strong>Cookeville's Premier Mobile Detailing Service</strong></h1>
      </div>

      <div className={styles.aboutContainer}>
        <section className={styles.introSection}>
          <p className={styles.introText}>
            <strong>Welcome to Driveway Detailing</strong>, where we bring professional 
            auto detailing services directly to your location in <mark>Cookeville, TN</mark> and 
            surrounding areas. Our commitment to excellence and customer satisfaction has made 
            us the trusted choice for mobile car detailing in the Upper Cumberland region.
          </p>
        </section>

        <SectionCard icon={<FaUser size={32} />} title="Meet Your Professional Detailer">
          <div className={styles.profileSection}>
            <Image 
              src="/images/profile-pic.jpg" 
              alt="Alex Joines - Professional Car Detailer in Cookeville" 
              width={200} 
              height={200} 
              className={styles.profilePic}
              priority
            />
            <div className={styles.profileContent}>
              <p>
                <strong>Hello, I'm Alex Joines</strong>, founder and lead detailer at 
                <em> Driveway Detailing</em>. As a Tennessee Tech graduate and full-time 
                software developer, I've transformed my passion for automotive care into 
                Cookeville's premier mobile detailing service. My journey in auto detailing 
                began with a simple love for cars and a dedication to maintaining them at 
                their absolute best.
              </p>
            </div>
          </div>
        </SectionCard>
        
        <SectionCard icon={<FaQuestionCircle size={32} />} title="Why Choose Driveway Detailing?">
          <p>
            <em>Driveway Detailing</em> stands out in the Cookeville area by offering a 
            unique combination of convenience and quality. As a locally owned and operated 
            business, we understand our community's needs and provide personalized service 
            that larger companies can't match.
          </p>
          <ul className={styles.benefitsList}>
            <li><strong>Mobile Service:</strong> <em>We come to your location</em></li>
            <li><strong>Personalized Care:</strong> <em>Every vehicle receives individual attention</em></li>
            <li><strong>Professional Equipment:</strong> <em>Using only premium detailing products</em></li>
            <li><strong>Flexible Scheduling:</strong> <em>Appointments that work around your schedule</em></li>
          </ul>
        </SectionCard>
        
        <SectionCard icon={<FaClipboardList size={32} />} title="Our Professional Approach">
          <p>
            We believe in delivering exceptional results through a methodical and thorough 
            approach to auto detailing. Our service combines industry best practices with 
            attention to detail that ensures your vehicle receives the best possible care.
          </p>
          <ul className={styles.approachList}>
            <li><strong>Customized Service:</strong> <em>Each vehicle gets a tailored detailing plan</em></li>
            <li><strong>Quality Products:</strong> <em>Using premium, research-backed products</em></li>
            <li><strong>Proven Techniques:</strong> <em>Implementing professional detailing methods</em></li>
            <li><strong>Continuous Learning:</strong> <em>Staying updated with industry advancements</em></li>
          </ul>
        </SectionCard>
        
        <SectionCard icon={<FaHandshake size={32} />} title="Our Commitment">
          <p>
            At <strong>Driveway Detailing</strong>, we're committed to exceeding expectations 
            with every service. Whether you're preparing your vehicle for a special event or 
            maintaining its value through regular detailing, we deliver results that speak 
            for themselves.
          </p>
        </SectionCard>

        <SectionCard icon={<FaPhoneAlt size={32} />} title="Let's Connect">
          <p>
            Ready to experience the best in mobile car detailing? Contact us to discuss your 
            vehicle's needs or schedule a service. We're proud to serve Cookeville and the 
            surrounding communities with professional, convenient, and high-quality auto 
            detailing services.
          </p>
          <div className={styles.contactInfo}>
            <p><strong>Phone:</strong> <em>931-303-4942</em></p>
            <p><strong>Email:</strong> <em>alex.drivewaydetail@gmail.com</em></p>
            <p><strong>Service Area:</strong> <em>Cookeville, TN and surrounding areas</em></p>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}