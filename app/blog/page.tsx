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

// Sample blog posts - these would be replaced with your actual content
const blogPosts: BlogPost[] = [
  {
    id: 'economics-of-detailing',
    title: 'Time is Money: The Real Economics of Professional Car Detailing',
    excerpt: 'Discover why professional car detailing can be more economical than DIY when you consider the true value of your time, equipment costs, and expertise.',
    date: 'April 7, 2025',
    image: '/images/blog/econ-blog.jpg',
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