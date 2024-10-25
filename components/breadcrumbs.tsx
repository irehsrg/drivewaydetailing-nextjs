'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Breadcrumbs = () => {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);
  
  if (pathname === '/') return null; // Don't show breadcrumbs on home page
  
  return (
    <nav aria-label="Breadcrumb" className="px-4 py-2 text-sm text-white/70">
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="hover:text-white">
            Home
          </Link>
        </li>
        {paths.map((path, index) => {
          const href = `/${paths.slice(0, index + 1).join('/')}`;
          const label = path.charAt(0).toUpperCase() + path.slice(1);
          const isLast = index === paths.length - 1;
          
          return (
            <React.Fragment key={href}>
              <li className="text-white/50">/</li>
              <li>
                {isLast ? (
                  <span className="text-white">{label}</span>
                ) : (
                  <Link href={href} className="hover:text-white">
                    {label}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;