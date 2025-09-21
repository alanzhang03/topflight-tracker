import React from "react";
import {
  Shield,
  Eye,
  Lock,
  Database,
  UserCheck,
  AlertCircle,
  CheckCircle,
  Clock,
  Globe,
  Mail,
  Settings,
} from "lucide-react";
import styles from "./privacy.module.scss";

const PrivacyPage = () => {
  const dataTypes = [
    {
      icon: <Eye className={styles.iconBlue} />,
      title: "Usage Analytics",
      description:
        "We collect anonymous usage statistics to improve our service, including page views, feature usage, and performance metrics.",
    },
    {
      icon: <Database className={styles.iconGreen} />,
      title: "Cached Data",
      description:
        "We temporarily store football data from third-party APIs to improve performance and reduce API calls. This data is automatically refreshed.",
    },
    {
      icon: <UserCheck className={styles.iconPurple} />,
      title: "Favorites Data",
      description:
        "Your favorite teams and preferences are stored locally in your browser. This data is not transmitted to our servers.",
    },
    {
      icon: <Settings className={styles.iconYellow} />,
      title: "User Preferences",
      description:
        "Theme settings, display preferences, and other user customizations are stored locally in your browser.",
    },
  ];

  const privacyPrinciples = [
    {
      icon: <CheckCircle className={styles.checkIcon} />,
      text: "We do not collect personal information without your consent",
    },
    {
      icon: <CheckCircle className={styles.checkIcon} />,
      text: "All data transmission is encrypted using industry-standard protocols",
    },
    {
      icon: <CheckCircle className={styles.checkIcon} />,
      text: "We do not sell, rent, or share your data with third parties",
    },
    {
      icon: <CheckCircle className={styles.checkIcon} />,
      text: "You can clear your local data at any time through browser settings",
    },
    {
      icon: <CheckCircle className={styles.checkIcon} />,
      text: "We use only necessary cookies for essential functionality",
    },
    {
      icon: <CheckCircle className={styles.checkIcon} />,
      text: "Third-party APIs have their own privacy policies we cannot control",
    },
  ];

  const dataProtection = [
    {
      icon: <Lock className={styles.protectionIcon} />,
      title: "Data Encryption",
      description:
        "All data transmission between your browser and our servers is encrypted using HTTPS/TLS protocols to ensure your information remains secure.",
    },
    {
      icon: <Shield className={styles.protectionIcon} />,
      title: "No Personal Data Storage",
      description:
        "We do not store personal information on our servers. All user preferences and favorites are stored locally in your browser.",
    },
    {
      icon: <Database className={styles.protectionIcon} />,
      title: "Secure API Integration",
      description:
        "We only use reputable third-party APIs (Football-Data API, NewscatcherAPI) that follow industry-standard security practices.",
    },
  ];

  const contactInfo = [
    {
      icon: <Mail className={styles.contactIcon} />,
      title: "Privacy Questions",
      description: "For questions about our privacy practices",
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
      description: "This policy was last updated on",
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
            <Shield />
          </div>
          <h1 className={styles.heroTitle}>Privacy Policy</h1>
          <p className={styles.heroDescription}>
            Your privacy is important to us. This policy explains how we
            collect, use, and protect your information when you use TopFlight
            Tracker.
          </p>
          <div className={styles.buttonContainer}>
            <button className={styles.primaryButton}>
              Read Terms of Service
            </button>
            <button className={styles.secondaryButton}>Contact Us</button>
          </div>
        </div>
      </section>

      {/* Privacy Principles Section */}
      <section className={styles.principlesSection}>
        <div className={styles.containerInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Our Privacy Principles</h2>
            <p className={styles.sectionSubtitle}>
              We are committed to protecting your privacy and being transparent
              about our practices
            </p>
          </div>
          <div className={styles.principlesGrid}>
            {privacyPrinciples.map((principle, index) => (
              <div key={index} className={styles.principleItem}>
                <div className={styles.principleIcon}>{principle.icon}</div>
                <p className={styles.principleText}>{principle.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Types Section */}
      <section className={styles.dataTypesSection}>
        <div className={styles.containerInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>What Data We Collect</h2>
            <p className={styles.sectionSubtitle}>
              We are transparent about the types of data we collect and how we
              use it
            </p>
          </div>
          <div className={styles.dataTypesGrid}>
            {dataTypes.map((dataType, index) => (
              <div key={index} className={styles.dataTypeCard}>
                <div className={styles.dataTypeIcon}>{dataType.icon}</div>
                <h3 className={styles.dataTypeTitle}>{dataType.title}</h3>
                <p className={styles.dataTypeDescription}>
                  {dataType.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Protection Section */}
      <section className={styles.protectionSection}>
        <div className={styles.containerInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>How We Protect Your Data</h2>
            <p className={styles.sectionSubtitle}>
              We implement multiple layers of security to keep your information
              safe
            </p>
          </div>
          <div className={styles.protectionGrid}>
            {dataProtection.map((protection, index) => (
              <div key={index} className={styles.protectionCard}>
                <div className={styles.protectionIconContainer}>
                  {protection.icon}
                </div>
                <h3 className={styles.protectionTitle}>{protection.title}</h3>
                <p className={styles.protectionDescription}>
                  {protection.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Privacy Information */}
      <section className={styles.detailedSection}>
        <div className={styles.containerInner}>
          <div className={styles.detailedContent}>
            <h2 className={styles.sectionTitle}>
              Detailed Privacy Information
            </h2>
            <div className={styles.privacyList}>
              <div className={styles.privacyItem}>
                <h3 className={styles.privacyTitle}>
                  1. Information We Collect
                </h3>
                <p className={styles.privacyContent}>
                  TopFlight Tracker is designed with privacy in mind. We collect
                  minimal data necessary to provide our service:
                  <br />
                  <br />• <strong>Anonymous Usage Data:</strong> Page views,
                  feature usage, and performance metrics to improve our service
                  <br />• <strong>Local Storage Data:</strong> Your favorite
                  teams, theme preferences, and other settings stored in your
                  browser
                  <br />• <strong>Cached Football Data:</strong> Match results,
                  standings, and news temporarily stored to improve performance
                </p>
              </div>
              <div className={styles.privacyItem}>
                <h3 className={styles.privacyTitle}>
                  2. How We Use Your Information
                </h3>
                <p className={styles.privacyContent}>
                  We use the collected information solely to:
                  <br />
                  <br />
                  • Provide and improve our football tracking service
                  <br />
                  • Optimize website performance and user experience
                  <br />
                  • Ensure the security and functionality of our platform
                  <br />• Comply with legal obligations and protect our rights
                </p>
              </div>
              <div className={styles.privacyItem}>
                <h3 className={styles.privacyTitle}>3. Third-Party Services</h3>
                <p className={styles.privacyContent}>
                  Our service integrates with third-party APIs and services:
                  <br />
                  <br />• <strong>Football-Data API:</strong> Provides match
                  data, standings, and team information
                  <br />• <strong>NewscatcherAPI:</strong> Delivers football
                  news and articles
                  <br />• <strong>Redis Cache:</strong> Temporarily stores data
                  for improved performance
                  <br />
                  <br />
                  These services have their own privacy policies, and we
                  encourage you to review them.
                </p>
              </div>
              <div className={styles.privacyItem}>
                <h3 className={styles.privacyTitle}>
                  4. Cookies and Local Storage
                </h3>
                <p className={styles.privacyContent}>
                  We use minimal cookies and local storage:
                  <br />
                  <br />• <strong>Essential Cookies:</strong> Required for basic
                  website functionality
                  <br />• <strong>Local Storage:</strong> Stores your
                  preferences and favorites locally in your browser
                  <br />• <strong>No Tracking Cookies:</strong> We do not use
                  cookies for advertising or tracking purposes
                </p>
              </div>
              <div className={styles.privacyItem}>
                <h3 className={styles.privacyTitle}>5. Data Security</h3>
                <p className={styles.privacyContent}>
                  We implement appropriate security measures to protect your
                  information:
                  <br />
                  <br />
                  • All data transmission is encrypted using HTTPS/TLS protocols
                  <br />
                  • We do not store personal information on our servers •
                  Regular security assessments and updates
                  <br />• Access controls and monitoring systems
                </p>
              </div>
              <div className={styles.privacyItem}>
                <h3 className={styles.privacyTitle}>
                  6. Your Rights and Choices
                </h3>
                <p className={styles.privacyContent}>
                  You have the right to:
                  <br />
                  <br />
                  • Clear your browser's local storage to remove stored
                  preferences
                  <br />
                  • Disable cookies through your browser settings
                  <br />
                  • Contact us with questions about your data
                  <br />
                  • Request information about what data we have collected
                  <br />• Withdraw consent for data processing at any time
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
            <h2 className={styles.sectionTitle}>Questions About Privacy?</h2>
            <p className={styles.sectionSubtitle}>
              We're committed to transparency and are here to answer your
              privacy questions
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
            <h2 className={styles.ctaTitle}>Your Privacy Matters to Us</h2>
            <p className={styles.ctaDescription}>
              We are committed to protecting your privacy and being transparent
              about our data practices. If you have any questions or concerns,
              please don't hesitate to contact us.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaPrimaryButton}>
                I Understand the Policy
              </button>
              <button className={styles.ctaSecondaryButton}>
                Read Terms of Service
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPage;
