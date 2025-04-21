'use client';

import React from 'react';

interface MarkdownProps {
  content: string;
  className?: string;
}

const Markdown: React.FC<MarkdownProps> = ({ content, className = '' }) => {
  return (
    <div 
      className={className}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export default Markdown;