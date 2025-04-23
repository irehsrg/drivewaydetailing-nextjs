import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import Breadcrumbs from '@/components/breadcrumbs';
import styles from './blog.module.css';

// Metadata for the blog index page
export const metadata: Metadata = {
  title: 'Blog | Driveway Detailing',
  description: 'Read our latest car detailing tips and insights on the Driveway Detailing blog.',
};

// Export viewport separately - this fixes the warning
export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

// Fetch all blog posts
async function getPosts() {
  return await client.fetch(`
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      publishedAt,
      author->{name, image},
      categories[]->{_id, title},
      "excerpt": array::join(string::split(pt::text(body[0...1]), "")[0...200], "") + "..."
    }
  `);
}

// Format date for display
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
}

export default async function BlogIndex() {
  const posts = await getPosts();
  
  return (
    <div className={styles.blogPage}>
      <Breadcrumbs />
      <div className={styles.blogContainer}>
        <header className={styles.blogHeader}>
          <h1>Driveway Detailing Blog</h1>
          <p>Professional car care tips and insights to keep your vehicle looking its best</p>
        </header>
        
        <div className={styles.postsGrid}>
          {posts.map((post: any) => (
            <article key={post._id} className={styles.postCard}>
              <div className={styles.postImage}>
                {post.mainImage && (
                  <Image
                    src={urlFor(post.mainImage).width(400).height(250).url()}
                    alt={post.title}
                    width={400}
                    height={250}
                    className={styles.image}
                  />
                )}
              </div>
              <div className={styles.postContent}>
                <div className={styles.postMeta}>
                  <span className={styles.postDate}>{formatDate(post.publishedAt)}</span>
                  {post.categories && post.categories.length > 0 && (
                    <span className={styles.postCategory}>{post.categories[0].title}</span>
                  )}
                </div>
                <h2 className={styles.postTitle}>
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                <p className={styles.postExcerpt}>{post.excerpt}</p>
                <div className={styles.postFooter}>
                  <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                    Read More →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}