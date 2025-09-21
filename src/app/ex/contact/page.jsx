"use client";
import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  Bug,
  Star,
  Globe,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import styles from "./contact.module.scss";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactInfo = [
    {
      icon: <Mail className={styles.contactIcon} />,
      title: "Email Support",
      description: "Get help via email",
      value: "alan.s.zhang@gmail.com",
      action: "mailto:alan.s.zhang@gmail.com",
    },
    {
      icon: <Phone className={styles.contactIcon} />,
      title: "Response Time",
      description: "We typically respond within",
      value: "24-48 hours",
    },
    {
      icon: <MapPin className={styles.contactIcon} />,
      title: "Location",
      description: "Based in",
      value: "Global",
    },
    {
      icon: <Clock className={styles.contactIcon} />,
      title: "Support Hours",
      description: "Available",
      value: "24/7",
    },
  ];

  const contactCategories = [
    {
      icon: <MessageSquare className={styles.categoryIcon} />,
      title: "General Inquiry",
      value: "general",
      description: "Questions about TopFlight Tracker features and usage",
    },
    {
      icon: <Bug className={styles.categoryIcon} />,
      title: "Bug Report",
      value: "bug",
      description: "Report issues or technical problems",
    },
    {
      icon: <HelpCircle className={styles.categoryIcon} />,
      title: "Technical Support",
      value: "support",
      description: "Get help with API integration or technical issues",
    },
    {
      icon: <Star className={styles.categoryIcon} />,
      title: "Feature Request",
      value: "feature",
      description: "Suggest new features or improvements",
    },
  ];

  const faqItems = [
    {
      question: "How do I get started with TopFlight Tracker?",
      answer:
        "Simply visit our homepage and explore the different leagues. You can view standings, fixtures, results, and news for Premier League, Bundesliga, La Liga, and Champions League.",
    },
    {
      question: "Is the API free to use?",
      answer:
        "Yes, our API is currently free to use. You can access all endpoints without authentication, though we implement rate limiting to ensure fair usage.",
    },
    {
      question: "How often is the data updated?",
      answer:
        "Data is cached with different expiration times: standings (30s), fixtures (100s), results (40s), teams (7 days), and news (22 hours). This ensures fresh data while maintaining performance.",
    },
    {
      question: "Can I use TopFlight Tracker data in my own project?",
      answer:
        "Yes, you can integrate our API into your own applications. Please review our Terms of Service for usage guidelines and consider our rate limits.",
    },
    {
      question: "What leagues are supported?",
      answer:
        "We currently support Premier League (England), Bundesliga (Germany), La Liga (Spain), and Champions League (Europe).",
    },
    {
      question: "How can I report a bug or issue?",
      answer:
        "Use the contact form below and select &apos;Bug Report&apos; as the category. Please provide as much detail as possible about the issue you&apos;re experiencing.",
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        category: "general",
      });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroIcon}>
            <MessageSquare />
          </div>
          <h1 className={styles.heroTitle}>Contact Us</h1>
          <p className={styles.heroDescription}>
            Have questions about TopFlight Tracker? We&apos;re here to help! Get
            in touch with us for support, feedback, or any inquiries.
          </p>
          <div className={styles.buttonContainer}>
            <button className={styles.primaryButton}>Send Message</button>
            <button className={styles.secondaryButton}>View FAQ</button>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className={styles.contactInfoSection}>
        <div className={styles.containerInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Get in Touch</h2>
            <p className={styles.sectionSubtitle}>
              Choose the best way to reach us for your needs
            </p>
          </div>
          <div className={styles.contactInfoGrid}>
            {contactInfo.map((info, index) => (
              <div key={index} className={styles.contactInfoCard}>
                <div className={styles.contactInfoIcon}>{info.icon}</div>
                <h3 className={styles.contactInfoTitle}>{info.title}</h3>
                <p className={styles.contactInfoDescription}>
                  {info.description}
                </p>
                {info.action ? (
                  <a
                    href={info.action}
                    className={styles.contactInfoValue}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {info.value}
                  </a>
                ) : (
                  <span className={styles.contactInfoValue}>{info.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className={styles.formSection}>
        <div className={styles.containerInner}>
          <div className={styles.formContainer}>
            <div className={styles.formHeader}>
              <h2 className={styles.formTitle}>Send us a Message</h2>
              <p className={styles.formDescription}>
                Fill out the form below and we&apos;ll get back to you as soon
                as possible
              </p>
            </div>

            <form onSubmit={handleSubmit} className={styles.contactForm}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.formLabel}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    required
                    placeholder="Enter your full name"
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.formLabel}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    required
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="category" className={styles.formLabel}>
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className={styles.formSelect}
                    required
                  >
                    {contactCategories.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="subject" className={styles.formLabel}>
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    required
                    placeholder="Brief description of your inquiry"
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.formLabel}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className={styles.formTextarea}
                  required
                  rows={6}
                  placeholder="Please provide details about your inquiry..."
                />
              </div>

              {submitStatus === "success" && (
                <div className={styles.successMessage}>
                  <CheckCircle className={styles.successIcon} />
                  <span>
                    Message sent successfully! We&apos;ll get back to you soon.
                  </span>
                </div>
              )}

              {submitStatus === "error" && (
                <div className={styles.errorMessage}>
                  <AlertCircle className={styles.errorIcon} />
                  <span>Failed to send message. Please try again.</span>
                </div>
              )}

              <button
                type="submit"
                className={styles.submitButton}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className={styles.spinner}></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className={styles.submitIcon} />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faqSection}>
        <div className={styles.containerInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <p className={styles.sectionSubtitle}>
              Find answers to common questions about TopFlight Tracker
            </p>
          </div>
          <div className={styles.faqGrid}>
            {faqItems.map((faq, index) => (
              <div key={index} className={styles.faqItem}>
                <h3 className={styles.faqQuestion}>{faq.question}</h3>
                <p className={styles.faqAnswer}>{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Details Section */}
      <section className={styles.categoriesSection}>
        <div className={styles.containerInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Contact Categories</h2>
            <p className={styles.sectionSubtitle}>
              Choose the most appropriate category for your inquiry
            </p>
          </div>
          <div className={styles.categoriesGrid}>
            {contactCategories.map((category, index) => (
              <div key={index} className={styles.categoryCard}>
                <div className={styles.categoryIcon}>{category.icon}</div>
                <h3 className={styles.categoryTitle}>{category.title}</h3>
                <p className={styles.categoryDescription}>
                  {category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.containerInner}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Get Started?</h2>
            <p className={styles.ctaDescription}>
              Join thousands of football fans who rely on TopFlight Tracker for
              the latest scores, standings, and news from top European leagues.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaPrimaryButton}>
                Explore Leagues
              </button>
              <button className={styles.ctaSecondaryButton}>
                View API Docs
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
