import React from 'react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

// Define styles for the blog post content
const styles = {
  inlineLink: {
    color: '#0094ff',
    textDecoration: 'underline',
    transition: 'opacity 0.3s',
  },
  postContentImage: {
    margin: '2rem 0',
  },
  figcaption: {
    textAlign: 'center' as const,
    fontSize: '0.9rem',
    color: '#cccccc',
    marginTop: '0.5rem',
  },
  blockquote: {
    borderLeft: '4px solid #0094ff',
    paddingLeft: '1.5rem',
    marginLeft: 0,
    marginRight: 0,
    fontStyle: 'italic',
    color: '#cccccc',
  },
};

// Custom components for the PortableText renderer
export const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div style={styles.postContentImage}>
          <Image
            src={urlFor(value).width(800).fit('max').auto('format').url()}
            alt={value.alt || 'Blog post image'}
            width={800}
            height={600}
            style={{
              objectFit: 'contain',
              width: '100%',
              height: 'auto',
            }}
          />
          {value.caption && (
            <figcaption style={styles.figcaption}>{value.caption}</figcaption>
          )}
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <a href={value.href} rel={rel} style={styles.inlineLink}>
          {children}
        </a>
      );
    },
    strong: ({ children }: any) => <strong>{children}</strong>,
    em: ({ children }: any) => <em>{children}</em>,
  },
  block: {
    h1: ({ children }: any) => <h1>{children}</h1>,
    h2: ({ children }: any) => <h2>{children}</h2>,
    h3: ({ children }: any) => <h3>{children}</h3>,
    h4: ({ children }: any) => <h4>{children}</h4>,
    blockquote: ({ children }: any) => <blockquote style={styles.blockquote}>{children}</blockquote>,
    normal: ({ children }: any) => <p>{children}</p>,
  },
  list: {
    bullet: ({ children }: any) => <ul>{children}</ul>,
    number: ({ children }: any) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }: any) => <li>{children}</li>,
    number: ({ children }: any) => <li>{children}</li>,
  },
};