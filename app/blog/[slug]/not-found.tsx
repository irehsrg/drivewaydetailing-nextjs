import React from 'react';
import Link from 'next/link';
import styles from './blogpost.module.css';

export default function NotFound() {
  return (
    <div className={styles.blogPostPage}>
      <div className={styles.notFoundContainer}>
        <h1>Article Not Found</h1>
        <p>Sorry, the blog post you're looking for doesn't exist or has been moved.</p>
        <Link href="/blog" className={styles.backToButton}>
          Back to Blog
        </Link>
      </div>
    </div>
  );
}