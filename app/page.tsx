import React from 'react';
import Link from 'next/link';
import { FaInstagram, FaFacebookF } from 'react-icons/fa';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Driveway Detailing | Premium Mobile Car Detailing in Cookeville, TN',
  description: 'Driveway Detailing offers top-quality mobile car detailing services in Cookeville, TN. We drive for perfection in exterior and interior detailing, headlight restoration, and more.',
};

export default function Home() {
  return (
    <div className="home-page">
      <video autoPlay loop muted className="video-background">
        <source src="/images/Car Edit.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
      <div className="social-media-sidebar">
        <a href="https://www.instagram.com/drivewaydetailing.tn/" aria-label="Instagram"><FaInstagram /></a>
        <a href="https://www.facebook.com/profile.php?id=61566610701668" aria-label="Facebook"><FaFacebookF /></a>
      </div>
      <div className="home-content">
        <h1>Driving for perfection</h1>
        <p>Cookeville&apos;s local detailing professional</p>
        <div className="button-group">
          <Link href="/services" className="btn btn-primary">OUR SERVICES</Link>
          <a href="https://squareup.com/appointments/book/o2ujm7vaufvhbc/LJEE0W1TJ1XZY/start" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">MAKE A BOOKING</a>
        </div>
      </div>
      <section className="about-section">
        <h2>Why Choose Driveway Detailing?</h2>
        <p>At Driveway Detailing, I bring the car wash to you. Our mobile detailing services offer convenience without compromising on quality. With years of experience and a passion for perfection, I ensure your vehicle receives the highest standard of care.</p>
        <ul>
          <li>Professional-grade products and equipment</li>
          <li>Experienced and detail-oriented staff</li>
          <li>Customized detailing packages to suit your needs</li>
          <li>Environmentally friendly practices</li>
        </ul>
      </section>
    </div>
  );
}