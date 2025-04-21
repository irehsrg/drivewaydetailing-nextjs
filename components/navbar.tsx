// Update the navigation links in navbar.tsx
// Original file at components/navbar.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes } from 'react-icons/fa';
import styles from './navbar.module.css';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.mainNav}>
        <Link href="/" className={styles.logoLink}>
          <Image src="/images/logo-transparent-png.png" alt="Driveway Detailing Logo" width={180} height={180} className={styles.logo} />
        </Link>
        {isMobile && (
          <div className={styles.menuIcon} onClick={toggleMenu}>
            {isOpen ? <FaTimes color="#0094ff" size={24} /> : <FaBars color="#0094ff" size={24} />}
          </div>
        )}
        <ul className={`${styles.navLinks} ${isMobile ? (isOpen ? styles.show : styles.hide) : ''}`}>
          <li><Link href="/" onClick={toggleMenu}>HOME</Link></li>
          <li><Link href="/services" onClick={toggleMenu}>SERVICES</Link></li>
          <li><Link href="/about" onClick={toggleMenu}>ABOUT</Link></li>
          <li><Link href="/gallery" onClick={toggleMenu}>GALLERY</Link></li>
          <li><Link href="/blog" onClick={toggleMenu}>BLOG</Link></li>
          <li><Link href="/contact" onClick={toggleMenu}>CONTACT</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;