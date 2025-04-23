import React from 'react';
import Link from 'next/link';
import styles from '../blog.module.css';
import Breadcrumbs from '@/components/breadcrumbs';

export default function BlogPostNotFound() {
  return (
    <div className={styles.blogPage}>
      <Breadcrumbs />
      <div className={styles.blogContainer}>
        <div className={styles.notFoundContainer}>
          <h1>Post Not Found</h1>
          <p>The blog post you're looking for doesn't exist or may have been removed.</p>
          <Link href="/blog" className={styles.backButton}>
            ← Back to All Posts
          </Link>
        </div>
      </div>
    </div>
  );
}