'use client';

import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { FaUser, FaEnvelope, FaComment } from 'react-icons/fa';
import styles from './contact.module.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    emailjs.send('service_s9f2xo6', 'template_pdvf3nr', formData, 'I2YKtXsJPsgVC6LL-')
      .then((response) => {
        console.log('Notification email sent successfully:', response);
        setSubmitMessage('Thank you for your message. I\'ll get back to you soon!');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        setSubmitMessage('Oops! Something went wrong. Please try again later.');
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className={styles.contactForm}>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <FaUser className={styles.icon} />
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
          />
        </div>
        <div className={styles.formGroup}>
          <FaEnvelope className={styles.icon} />
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Your Email"
          />
        </div>
        <div className={styles.formGroup}>
          <FaComment className={styles.icon} />
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Your Message"
          ></textarea>
        </div>
        <button 
          type="submit" 
          disabled={isSubmitting}
          className={styles.submitButton}
        >
          {isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </form>
      {submitMessage && (
        <div className={`${styles.submitMessage} ${submitMessage.includes('Oops') ? styles.error : styles.success}`}>
          {submitMessage}
        </div>
      )}
    </div>
  );
}