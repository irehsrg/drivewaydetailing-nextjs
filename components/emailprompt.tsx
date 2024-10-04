'use client';

import React, { useState, useEffect } from 'react';
import styles from './emailprompt.module.css';

const EmailPrompt: React.FC = () => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const hasSeenPrompt = localStorage.getItem('hasSeenEmailPrompt');
    if (!hasSeenPrompt) {
      setShowPrompt(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('hasSeenEmailPrompt', 'true');
    setShowPrompt(false);
    // Submit the form
    e.currentTarget.submit();
  };

  const handleClose = () => {
    localStorage.setItem('hasSeenEmailPrompt', 'true');
    setShowPrompt(false);
  };

  if (!showPrompt) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.prompt}>
        <button className={styles.closeButton} onClick={handleClose}>×</button>
        <h2>Join Our Mailing List</h2>
        <p>Stay updated with our latest offers and services!</p>
        <form action="https://squareup.com/outreach/ioiUMS/subscribe" method="POST" target="_blank" onSubmit={handleSubmit}>
          <input type="hidden" name="embed" value="true" />
          <button type="submit" className={styles.submitButton}>Join Now</button>
        </form>
      </div>
    </div>
  );
};

export default EmailPrompt;