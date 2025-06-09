import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/breadcrumbs';
import styles from '../blog.module.css';

export const metadata: Metadata = {
  title: 'What Actually Happens During a Professional Detail: A Step-by-Step Breakdown | Driveway Detailing Blog',
  description: 'Ever wondered what you\'re paying for with professional detailing? Get an honest, behind-the-scenes look at the systematic process that transforms your vehicle.',
};

export default function WhatHappensDuringDetail() {
  return (
    <div className={styles.blogPostPage}>
      <Breadcrumbs />
      <div className={styles.blogPostContainer}>
        <article>
          <header className={styles.blogPostHeader}>
            <h1 className={styles.blogPostTitle}>What Actually Happens During a Professional Detail: A Step-by-Step Breakdown</h1>
            <p className={styles.blogPostMeta}>May 19, 2025 • by Alex Joines</p>
          </header>
          
          <div className={styles.blogPostImageContainer}>
            <Image
              src="/images/blog/checklist.jpg"
              alt="Professional detailer working systematically on a vehicle"
              width={900}
              height={500}
              className={styles.blogPostImage}
            />
          </div>
          
          <div className={styles.blogPostContent}>
            <p>
              Many customers wonder what exactly they're paying for when they book a professional detailing service. 
              Unlike a quick car wash, professional detailing involves a systematic process designed to thoroughly 
              clean and protect your vehicle. Here's an honest look at what actually happens during a typical mobile 
              detailing appointment at Driveway Detailing.
            </p>
            
            <h2>Initial Assessment and Setup (15-20 minutes)</h2>
            <p>
              When I arrive at your location, the process begins with:
            </p>
            
            <p><strong>Vehicle Inspection</strong></p>
            <ul>
              <li>Walking around the vehicle to assess its current condition</li>
              <li>Identifying problem areas that need special attention</li>
              <li>Noting any existing damage to avoid later confusion</li>
              <li>Discussing any specific concerns you have about the vehicle</li>
            </ul>
            
            <p><strong>Equipment Setup</strong></p>
            <ul>
              <li>Unloading cleaning supplies and equipment from my vehicle</li>
              <li>Setting up my mobile water supply and sourcing eletrcity</li>
              <li>Organizing tools and products based on your vehicle's specific needs</li>
              <li>Ensuring adequate workspace around your vehicle</li>
            </ul>
            
            <h2>Exterior Detailing Process (60-90 minutes)</h2>
            
            <h3>Pre-Rinse and Wheel Cleaning (15-20 minutes)</h3>
            <p>
              The exterior process always starts with the dirtiest areas:
            </p>
            <ul>
              <li><strong>Initial rinse</strong> only done when the paint is in direct sunlight</li>
              <li><strong>Wheel and tire cleaning</strong> using appropriate cleaners for your specific wheel type</li>
              <li><strong>Wheel well cleaning</strong> to remove accumulated road grime</li>
              <li><strong>Tire treatment</strong> comes at the end to restore appearance and provide protection</li>
            </ul>
            
            <p>
              Starting with wheels prevents spreading brake dust and road grime to clean paint later in the process.
            </p>
            
            <h3>Paint Washing and Decontamination (30-40 minutes)</h3>
            <p>
              The paint cleaning process involves multiple steps:
            </p>
            <ul>
              <li><strong>Foam pre-treatment</strong> to loosen embedded dirt safely</li>
              <li><strong>Two-bucket wash method</strong> using clean wash media to prevent scratching</li>
              <li><strong>Clay bar treatment</strong> (when needed) to remove bonded contaminants like tree sap or industrial fallout</li>
              <li><strong>Final rinse</strong> to remove all cleaning products</li>
            </ul>
            
            <p>
              This systematic approach ensures thorough cleaning without inflicting damage that aggressive washing causes.
            </p>
            
            <h3>Drying and Protection (15-30 minutes)</h3>
            <p>
              The final exterior steps focus on protection:
            </p>
            <ul>
              <li><strong>Hand drying</strong> using clean microfiber towels to prevent water spots</li>
              <li><strong>Trim restoration</strong> for plastic and rubber components</li>
              <li><strong>Sealant or wax application</strong> for paint protection and shine</li>
              <li><strong>Glass cleaning</strong> for crystal-clear visibility</li>
            </ul>
            
            <h2>Interior Detailing Process (45-75 minutes)</h2>
            
            <h3>Decluttering and Preparation (5-10 minutes)</h3>
            <p>
              Interior work begins with organization:
            </p>
            <ul>
              <li><strong>Removing personal items</strong> to access all surfaces</li>
              <li><strong>Floor mat removal</strong> for separate cleaning</li>
              <li><strong>Initial assessment</strong> of interior condition and material types</li>
            </ul>
            
            <h3>Vacuum and Extraction (20-30 minutes)</h3>
            <p>
              Thorough cleaning starts with debris removal:
            </p>
            <ul>
              <li><strong>Comprehensive vacuuming</strong> of all surfaces including seats, carpets, and crevices</li>
              <li><strong>Brush agitation</strong> for embedded dirt in fabric surfaces</li>
              <li><strong>Detail vacuuming</strong> of vents, cup holders, and tight spaces</li>
            </ul>
            
            <h3>Surface Cleaning and Protection (20-35 minutes)</h3>
            <p>
              Different materials require specific approaches:
            </p>
            <ul>
              <li><strong>Dashboard and trim cleaning</strong> with appropriate products for your vehicle's materials</li>
              <li><strong>Leather conditioning</strong> (if applicable) to maintain flexibility and appearance</li>
              <li><strong>Window cleaning</strong> for streak-free interior glass</li>
              <li><strong>Final detailing</strong> of controls, vents, and small components</li>
            </ul>
            
            <h2>Quality Check and Customer Walkthrough (10-15 minutes)</h2>
            <p>
              Every detail concludes with verification:
            </p>
            
            <p><strong>Final Inspection</strong></p>
            <ul>
              <li>Systematic review of all cleaned areas</li>
              <li>Touch-up of any missed spots</li>
              <li>Verification that all equipment and products are removed</li>
              <li>Ensuring the work area is clean</li>
            </ul>
            
            <p><strong>Customer Review</strong></p>
            <ul>
              <li>Walking through the completed work with you</li>
              <li>Explaining any limitations encountered</li>
              <li>Providing maintenance recommendations</li>
              <li>Addressing any questions about the service</li>
            </ul>
            
            <h2>What This Process Achieves</h2>
            <p>
              This systematic approach delivers several key benefits:
            </p>
            <ul>
              <li><strong>Thorough cleaning</strong> that reaches areas quick washes miss</li>
              <li><strong>Safe techniques</strong> that clean without causing damage</li>
              <li><strong>Appropriate products</strong> matched to your vehicle's specific materials</li>
              <li><strong>Professional results</strong> that last longer than typical DIY efforts</li>
              <li><strong>Time efficiency</strong> through experience and proper equipment</li>
            </ul>
            
            <h2>What's NOT Included (Unless Specifically Requested)</h2>
            <p>
              To maintain transparency, here's what a standard detail doesn't include:
            </p>
            <ul>
              <li>Paint correction or scratch removal</li>
              <li>Ceramic coating application</li>
              <li>Engine bay cleaning</li>
              <li>Headlight restoration (available as add-on service)</li>
            </ul>
            
            <h2>Realistic Expectations</h2>
            <p>
              Professional detailing dramatically improves your vehicle's appearance, but it's important to understand:
            </p>
            <ul>
              <li><strong>Existing damage</strong> (scratches, stains) may be improved but not eliminated</li>
              <li><strong>Severely neglected vehicles</strong> may require multiple sessions for optimal results</li>
              <li><strong>Some stains or odors</strong> may be permanent despite professional treatment</li>
              <li><strong>Protection products</strong> enhance appearance but don't prevent all future damage</li>
            </ul>
            
            <h2>The Value of the Process</h2>
            <p>
              This systematic approach takes 2-4 hours depending on vehicle size and condition. While you could 
              potentially achieve similar results with DIY methods, the professional process offers:
            </p>
            <ul>
              <li><strong>Proven techniques</strong> developed through experience</li>
              <li><strong>Appropriate equipment</strong> for safe, effective cleaning</li>
              <li><strong>Quality products</strong> matched to specific cleaning challenges</li>
              <li><strong>Time savings</strong> for busy vehicle owners</li>
              <li><strong>Consistent results</strong> without trial-and-error</li>
            </ul>
            
            <h2>Conclusion</h2>
            <p>
              Professional detailing involves far more than spraying products and wiping surfaces. The systematic 
              approach ensures thorough cleaning while protecting your vehicle's surfaces and finishes. Understanding 
              this process helps explain why professional detailing costs more than basic car washes—and why the 
              results justify the investment.
            </p>
            
            <p>
              At Driveway Detailing, I follow this proven process for every vehicle, ensuring consistent, quality 
              results that protect both your automotive investment and your satisfaction with the service.
            </p>
            
            <div style={{ marginTop: '3rem', padding: '1.5rem', borderTop: '1px solid rgba(255, 255, 255, 0.2)', borderBottom: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <p style={{ fontStyle: 'italic', fontSize: '0.9rem' }}>
                <strong>About Driveway Detailing:</strong> As Cookeville's mobile detailing service, I bring 
                professional-grade equipment and systematic cleaning processes directly to your location, delivering 
                thorough results without the inconvenience of visiting a detail shop.
              </p>
            </div>
          </div>
        </article>
        
        <nav className={styles.blogPostNav}>
          <Link href="/blog" className={`${styles.blogPostNavLink} ${styles.blogPostNavLinkPrev}`}>
            Back to Blog
          </Link>
          <Link href="/blog/car-cleaning-myths" className={`${styles.blogPostNavLink} ${styles.blogPostNavLinkNext}`}>
            Next Post
          </Link>
        </nav>
      </div>
    </div>
  );
}