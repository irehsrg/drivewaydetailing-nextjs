// app/contact/contactform.tsx

'use client';

import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import { FaUser, FaEnvelope, FaComment, FaCar } from 'react-icons/fa';
import styles from './contact.module.css';

interface FormFields {
  name: string;
  email: string;
  vehicle: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormFields>({
    name: '',
    email: '',
    vehicle: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [formErrors, setFormErrors] = useState<Partial<FormFields>>({});

  const validateForm = (): boolean => {
    const errors: Partial<FormFields> = {};
    if (!formData.name.trim()) errors.name = 'Name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email';
    }
    if (!formData.message.trim()) errors.message = 'Message is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormFields]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      // Convert FormFields to a plain object with unknown values
      const templateParams: Record<string, unknown> = {
        name: formData.name,
        email: formData.email,
        vehicle: formData.vehicle,
        message: formData.message
      };

      await emailjs.send(
        'service_s9f2xo6',
        'template_pdvf3nr',
        templateParams,
        'I2YKtXsJPsgVC6LL-'
      );
      
      setSubmitMessage('Thank you for your message! We\'ll get back to you shortly.');
      setFormData({ name: '', email: '', vehicle: '', message: '' });
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitMessage('Oops! Something went wrong. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.contactForm} noValidate>
      <div className={styles.formGroup}>
        <FaUser className={styles.icon} aria-hidden="true" />
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          aria-required="true"
          aria-invalid={!!formErrors.name}
          aria-describedby={formErrors.name ? "name-error" : undefined}
        />
        {formErrors.name && (
          <span id="name-error" className={styles.errorMessage}>
            {formErrors.name}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <FaEnvelope className={styles.icon} aria-hidden="true" />
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          aria-required="true"
          aria-invalid={!!formErrors.email}
          aria-describedby={formErrors.email ? "email-error" : undefined}
        />
        {formErrors.email && (
          <span id="email-error" className={styles.errorMessage}>
            {formErrors.email}
          </span>
        )}
      </div>

      <div className={styles.formGroup}>
        <FaCar className={styles.icon} aria-hidden="true" />
        <select
          id="vehicle"
          name="vehicle"
          value={formData.vehicle}
          onChange={handleChange}
          className={styles.select}
        >
          <option value="">Select Vehicle Type (Optional)</option>
          <option value="coupe">Coupe</option>
          <option value="sedan">Sedan</option>
          <option value="suv">SUV</option>
          <option value="truck">Truck</option>
          <option value="van">Van</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <FaComment className={styles.icon} aria-hidden="true" />
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          aria-required="true"
          aria-invalid={!!formErrors.message}
          aria-describedby={formErrors.message ? "message-error" : undefined}
        />
        {formErrors.message && (
          <span id="message-error" className={styles.errorMessage}>
            {formErrors.message}
          </span>
        )}
      </div>

      <button 
        type="submit" 
        disabled={isSubmitting}
        className={styles.submitButton}
        aria-busy={isSubmitting}
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      {submitMessage && (
        <div 
          className={`${styles.submitMessage} ${
            submitMessage.includes('Oops') ? styles.error : styles.success
          }`}
          role="alert"
        >
          {submitMessage}
        </div>
      )}
    </form>
  );
}