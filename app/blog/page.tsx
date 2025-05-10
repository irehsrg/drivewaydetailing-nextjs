import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import Breadcrumbs from '@/components/breadcrumbs';
import styles from './blog.module.css';

export const metadata: Metadata = {
  title: 'Car Detailing Blog | Driveway Detailing in Cookeville, TN',
  description: 'Read our blog for car care tips, detailing guides, and expert advice to keep your vehicle looking its best. Professional car detailing insights from Cookeville, TN.',
};

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  author: string;
}

// Blog posts with updated IDs
const blogPosts: BlogPost[] = [
  {
    id: 'economics-of-detailing',
    title: 'Time is Money: The Real Economics of Professional Car Detailing',
    excerpt: 'Discover why professional car detailing can be more economical than DIY when you consider the true value of your time, equipment costs, and expertise.',
    date: 'April 7, 2025',
    image: '/images/blog/econ-blog.jpg',
    author: 'Alex Joines'
  },
  {
    id: 'seasonal-car-care',
    title: 'Seasonal Car Care: Practical Protection Strategies Year-Round',
    excerpt: "Learn effective seasonal car care strategies to protect your vehicle throughout the year in Tennessee's variable climate, from dealing with pollen in spring to road salt in winter.",
    date: 'April 14, 2025',
    image: '/images/blog/seasonal-blog.jpg',
    author: 'Alex Joines'
  },
  {
    id: 'joy-in-detailing',
    title: 'Finding Joy in the Little Things: The Satisfaction of a Freshly Detailed Car',
    excerpt: 'Explore the psychology behind the unique satisfaction of a freshly detailed car and how this simple pleasure impacts your mental wellbeing and daily experience.',
    date: 'April 21, 2025',
    image: '/images/blog/clean-car-joy.jpg',
    author: 'Alex Joines'
  },
  {
    id: 'beyond-aesthetics',
    title: 'Beyond Aesthetics: How Professional Detailing Protects Your Health',
    excerpt: 'Learn how professional car detailing does more than make your vehicle look good—it creates a healthier environment by removing allergens, reducing cross-contamination, and improving air quality.',
    date: 'April 28, 2025',
    image: '/images/blog/health-blog.jpeg',
    author: 'Alex Joines'
  },
  {
    id: 'mental-benefit',
    title: 'The Hidden Mental Benefits of a Clean Car: Why Detailing Is Self-Care',
    excerpt: 'Discover how a clean car impacts your mental wellbeing. Learn why professional detailing is an investment in self-care and psychological comfort.',
    date: 'May 5, 2025',
    image: '/images/blog/self-care-blog.jpg',
    author: 'Alex Joines'
  },
  {
    id: 'true-cost',
    title: 'The True Cost of Car Detailing: Is It Worth Your Money?',
    excerpt: 'Explore the comprehensive cost analysis of professional car detailing versus DIY approaches, considering equipment investment, time value, expertise, and convenience factors.',
    date: 'May 12, 2025',
    image: '/images/blog/cost-blog.jpg',
    author: 'Alex Joines'
  }
];

export default function Blog() {
  return (
    <div className={styles.blogPage}>
      <Breadcrumbs />
      <div className={styles.blogContainer}>
        <h1>Detailing Insights & Care Tips</h1>
        <p className={styles.blogIntro}>
          Welcome to the Driveway Detailing blog, where I share professional tips, industry insights, and best practices to help you maintain your vehicle's appearance and value. Explore our articles below for expert advice on car care and detailing.
        </p>
        
        <div className={styles.blogGrid}>
          {blogPosts.map((post) => (
            <div key={post.id} className={styles.blogCard}>
              <div className={styles.blogImageContainer}>
                <Image 
                  src={post.image}
                  alt={post.title}
                  width={600}
                  height={400}
                  className={styles.blogImage}
                />
              </div>
              <div className={styles.blogContent}>
                <p className={styles.blogDate}>{post.date} • by {post.author}</p>
                <h2 className={styles.blogTitle}>{post.title}</h2>
                <p className={styles.blogExcerpt}>{post.excerpt}</p>
                <Link href={`/blog/${post.id}`} className={styles.readMoreLink}>
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}