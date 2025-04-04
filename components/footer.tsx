import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import styles from './footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLogoSocial}>
          <Link href="/">
            <Image src="/images/logo-transparent-png.png" alt="Driveway Detailing Logo" width={150} height={150} />
          </Link>
          <div className={styles.socialIcons}>
            <a href="https://www.facebook.com/profile.php?id=61566483077685" aria-label="Facebook"><FaFacebookF color="#4267B2"/></a>
            <a href="https://www.instagram.com/drivewaydetailing.tn/" aria-label="Instagram"><FaInstagram color="#E1306C"/></a>
          </div>
        </div>
        <div className="footer-info" style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          flexGrow: 1,
          gap: '2rem'
        }}>
          <div className="footer-section" style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            flex: 1,
          }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'white' }}>Contact:</h3>
            <p>Call or Text: 931-303-4942</p>
            <p>Email: alex.drivewaydetail@gmail.com</p>
            <p>Cookeville, TN</p>
            <p><a href="https://drive.google.com/file/d/1qHBfHqTnxgUL_jGmtPJUTdBkmK_bmvBZ/view?usp=sharing" style={{ color: '#0094ff' }}>Privacy Policy</a></p>
          </div>          
          <div className="footer-section" style={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            flex: 1,
          }}>
            <h3 style={{ marginBottom: '0.5rem', color: 'white' }}>Areas Covered:</h3>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '0.5rem',
            }}>
              <div>
                <p>Algood</p>
                <p>Baxter</p>
                <p>Cookeville</p>
                <p>Gainesboro</p>
              </div>
              <div>
                <p>Monterey</p>
                <p>Sparta</p>
                <p>Crossville</p>
                <p>Livingston</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} Driveway Detailing | Top Rated Car Detailer in Your Area</p>
      </div>
    </footer>
  );
};

export default Footer;