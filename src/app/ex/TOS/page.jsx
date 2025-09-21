import React from "react";
import {
  Shield,
  FileText,
  Users,
  AlertTriangle,
  CheckCircle,
  Clock,
  Globe,
  Mail,
} from "lucide-react";
import styles from "./tos.module.scss";

const TOSPage = () => {
  const sections = [
    {
      icon: <FileText className={styles.iconBlue} />,
      title: "Acceptance of Terms",
      content:
        "By accessing and using TopFlight Tracker, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.",
    },
    {
      icon: <Users className={styles.iconGreen} />,
      title: "User Responsibilities",
      content:
        "Users are responsible for maintaining the confidentiality of their account information and for all activities that occur under their account. Users must not use the service for any unlawful purpose or in any way that could damage, disable, or impair the service.",
    },
    {
      icon: <Shield className={styles.iconPurple} />,
      title: "Data Usage",
      content:
        "TopFlight Tracker provides football statistics and news for informational purposes only. All data is sourced from third-party APIs and is subject to their respective terms of service. We do not guarantee the accuracy, completeness, or timeliness of the information provided.",
    },
    {
      icon: <AlertTriangle className={styles.iconYellow} />,
      title: "Limitation of Liability",
      content:
        "TopFlight Tracker shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use the service, even if we have been advised of the possibility of such damages.",
    },
  ];

  const keyPoints = [
    {
      icon: <CheckCircle className={styles.checkIcon} />,
      text: "Service is provided 'as is' without warranties of any kind",
    },
    {
      icon: <CheckCircle className={styles.checkIcon} />,
      text: "Users must be at least 13 years old to use this service",
    },
    {
      icon: <CheckCircle className={styles.checkIcon} />,
      text: "We reserve the right to modify these terms at any time",
    },
    {
      icon: <CheckCircle className={styles.checkIcon} />,
      text: "Prohibited activities include data scraping and reverse engineering",
    },
    {
      icon: <CheckCircle className={styles.checkIcon} />,
      text: "Service availability is not guaranteed and may be interrupted",
    },
    {
      icon: <CheckCircle className={styles.checkIcon} />,
      text: "Users are responsible for compliance with local laws",
    },
  ];

  const contactInfo = [
    {
      icon: <Mail className={styles.contactIcon} />,
      title: "Email Support",
      description: "For questions about these terms",
      value: "alan.s.zhang@gmail.com",
    },
    {
      icon: <Clock className={styles.contactIcon} />,
      title: "Response Time",
      description: "We typically respond within 24-48 hours",
      value: "24-48 hours",
    },
    {
      icon: <Globe className={styles.contactIcon} />,
      title: "Last Updated",
      description: "These terms were last updated on",
      value: "December 2024",
    },
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroIcon}>
            <FileText />
          </div>
          <h1 className={styles.heroTitle}>Terms of Service</h1>
          <p className={styles.heroDescription}>
            Please read these terms carefully before using TopFlight Tracker. By
            using our service, you agree to be bound by these terms and
            conditions.
          </p>
          <div className={styles.buttonContainer}>
            <button className={styles.primaryButton}>
              Read Privacy Policy
            </button>
            <button className={styles.secondaryButton}>Contact Us</button>
          </div>
        </div>
      </section>

      {/* Key Points Section */}
      <section className={styles.keyPointsSection}>
        <div className={styles.containerInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Key Points</h2>
            <p className={styles.sectionSubtitle}>
              Important information you should know before using our service
            </p>
          </div>
          <div className={styles.keyPointsGrid}>
            {keyPoints.map((point, index) => (
              <div key={index} className={styles.keyPointItem}>
                <div className={styles.keyPointIcon}>{point.icon}</div>
                <p className={styles.keyPointText}>{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className={styles.contentSection}>
        <div className={styles.containerInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Terms and Conditions</h2>
            <p className={styles.sectionSubtitle}>
              Detailed terms governing the use of TopFlight Tracker
            </p>
          </div>
          <div className={styles.sectionsGrid}>
            {sections.map((section, index) => (
              <div key={index} className={styles.sectionCard}>
                <div className={styles.sectionIcon}>{section.icon}</div>
                <h3 className={styles.sectionCardTitle}>{section.title}</h3>
                <p className={styles.sectionCardContent}>{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Terms Section */}
      <section className={styles.additionalSection}>
        <div className={styles.containerInner}>
          <div className={styles.additionalContent}>
            <h2 className={styles.sectionTitle}>Additional Terms</h2>
            <div className={styles.termsList}>
              <div className={styles.termItem}>
                <h3 className={styles.termTitle}>1. Intellectual Property</h3>
                <p className={styles.termContent}>
                  All content, trademarks, and intellectual property on
                  TopFlight Tracker are owned by us or our licensors. You may
                  not reproduce, distribute, or create derivative works without
                  our written permission.
                </p>
              </div>
              <div className={styles.termItem}>
                <h3 className={styles.termTitle}>2. Prohibited Uses</h3>
                <p className={styles.termContent}>
                  You may not use our service for any unlawful purpose, to
                  violate any laws, or to infringe upon the rights of others.
                  Automated data collection, scraping, or any form of systematic
                  data extraction is strictly prohibited.
                </p>
              </div>
              <div className={styles.termItem}>
                <h3 className={styles.termTitle}>3. Service Availability</h3>
                <p className={styles.termContent}>
                  We strive to maintain high service availability, but we do not
                  guarantee uninterrupted access. We may suspend or terminate
                  the service at any time for maintenance, updates, or other
                  reasons.
                </p>
              </div>
              <div className={styles.termItem}>
                <h3 className={styles.termTitle}>4. Third-Party Services</h3>
                <p className={styles.termContent}>
                  Our service integrates with third-party APIs and services. We
                  are not responsible for the availability, accuracy, or content
                  of these external services. Use of third-party services is
                  subject to their respective terms.
                </p>
              </div>
              <div className={styles.termItem}>
                <h3 className={styles.termTitle}>5. Termination</h3>
                <p className={styles.termContent}>
                  We may terminate or suspend your access to our service
                  immediately, without prior notice, for any reason, including
                  breach of these terms. Upon termination, your right to use the
                  service will cease immediately.
                </p>
              </div>
              <div className={styles.termItem}>
                <h3 className={styles.termTitle}>6. Governing Law</h3>
                <p className={styles.termContent}>
                  These terms shall be governed by and construed in accordance
                  with applicable laws. Any disputes arising from these terms or
                  your use of the service shall be resolved through appropriate
                  legal channels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.contactSection}>
        <div className={styles.containerInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Questions About These Terms?
            </h2>
            <p className={styles.sectionSubtitle}>
              We're here to help clarify any questions you may have
            </p>
          </div>
          <div className={styles.contactGrid}>
            {contactInfo.map((contact, index) => (
              <div key={index} className={styles.contactCard}>
                <div className={styles.contactIconContainer}>
                  {contact.icon}
                </div>
                <h3 className={styles.contactTitle}>{contact.title}</h3>
                <p className={styles.contactDescription}>
                  {contact.description}
                </p>
                <p className={styles.contactValue}>{contact.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.containerInner}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready to Use TopFlight Tracker?</h2>
            <p className={styles.ctaDescription}>
              By continuing to use our service, you acknowledge that you have
              read, understood, and agree to be bound by these terms of service.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaPrimaryButton}>
                I Agree to the Terms
              </button>
              <button className={styles.ctaSecondaryButton}>
                Read Privacy Policy
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TOSPage;
