import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaFacebookF, FaMapMarkerAlt, FaCar, FaPhone } from 'react-icons/fa';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/breadcrumbs';
import { getOrganizationSchema, getServiceSchema } from '@/lib/seo/schema';

export const metadata: Metadata = {
  title: "Cookeville's Best Auto Detailing - We Come to You! | Driveway Detailing",
  description: "Professional mobile auto detailing in Cookeville, TN. Expert car detailing services that come to your location. Interior & exterior detailing, ceramic coating, and headlight restoration by Cookeville's trusted detailing specialists.",
};

export default function Home() {
  return (
    <div className="home-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            getOrganizationSchema(),
            getServiceSchema()
          ])
        }}
      />
      
      <Breadcrumbs />
      
      <video autoPlay loop muted playsInline className="video-background" aria-hidden="true">
        <source src="/images/Car Edit.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="overlay" aria-hidden="true"></div>
      
      <div className="social-media-sidebar" aria-label="Social Media Links">
        <a href="https://www.instagram.com/drivewaydetailing.tn/" 
           aria-label="Follow us on Instagram">
          <FaInstagram />
        </a>
        <a href="https://www.facebook.com/profile.php?id=61566483077685" 
           aria-label="Visit our Facebook page">
          <FaFacebookF />
        </a>
      </div>

      <main className="home-content">
        <h1><strong>Cookeville's Best Auto Detailing</strong></h1>
        <h2>We Come to You!</h2>
        
        <section className="intro-section">
          <p>
            <strong>Welcome to Driveway Detailing</strong>, Cookeville's premier 
            <em> mobile auto detailing service</em>. We bring professional car detailing 
            directly to your location in <mark>Cookeville, TN</mark> and surrounding areas. 
            Our comprehensive services include <strong>interior detailing</strong> and
            <strong> exterior detailing</strong>.
          </p>
          
          <div className="key-features">
            <h3>Why Choose Driveway Detailing?</h3>
            <ul>
              <li>
                <FaCar aria-hidden="true" />
                <strong>Mobile Service:</strong> 
                <em>We bring professional detailing to your location</em>
              </li>
              <li>
                <FaMapMarkerAlt aria-hidden="true" />
                <strong>Local Expertise:</strong> 
                <em>Serving Cookeville and surrounding communities</em>
              </li>
              <li>
                <FaPhone aria-hidden="true" />
                <strong>Convenient Booking:</strong> 
                <em>Easy scheduling and professional service</em>
              </li>
            </ul>
          </div>
        </section>

        <div className="button-group">
          <Link href="/services" className="btn btn-primary">
            <strong>VIEW OUR SERVICES</strong>
          </Link>
          <a href="https://squareup.com/appointments/book/o2ujm7vaufvhbc/LJEE0W1TJ1XZY/start" 
             target="_blank" 
             rel="noopener noreferrer" 
             className="btn btn-secondary">
            <strong>BOOK NOW</strong>
          </a>
        </div>

        <section className="about-section">
          <h3>Experience the Best Car Detailing in Cookeville</h3>
          <p>
            At <strong>Driveway Detailing</strong>, we're committed to delivering 
            <em> exceptional auto detailing services</em> with unmatched convenience. 
            Our mobile detailing service brings professional-grade equipment and 
            expertise directly to you.
          </p>
          <ul>
            <li>
              <strong>Professional-Grade Products:&nbsp;</strong>
              <em>We use only the finest detailing products and equipment</em>
            </li>
            <li>
              <strong>Expert Service:&nbsp;</strong> 
              <em>Experienced and detail-oriented professional</em>
            </li>
            <li>
              <strong>Customized Packages:&nbsp;</strong> 
              <em>Tailored detailing solutions for your specific needs</em>
            </li>
            <li>
              <strong>Eco-Friendly Practices:&nbsp;</strong> 
              <em>Environmentally conscious cleaning methods</em>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}