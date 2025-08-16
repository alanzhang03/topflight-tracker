import React from "react";
import {
  Trophy,
  TrendingUp,
  Calendar,
  Newspaper,
  Globe,
  BarChart3,
  Clock,
} from "lucide-react";
import styles from "./about.module.scss";

const AboutPage = () => {
  const features = [
    {
      icon: <Clock className={styles.iconGreen} />,
      title: "Live Results",
      description:
        "Get real-time scores and match updates from ongoing games across top European leagues.",
    },
    {
      icon: <Trophy className={styles.iconYellow} />,
      title: "League Standings",
      description:
        "Track up-to-date standings for Premier League, Bundesliga, La Liga, and Champions League.",
    },
    {
      icon: <Calendar className={styles.iconBlue} />,
      title: "Fixtures & Schedule",
      description:
        "Never miss a match with comprehensive fixture lists and upcoming game schedules.",
    },
    {
      icon: <Newspaper className={styles.iconPurple} />,
      title: "Latest News",
      description:
        "Stay informed with the latest football news from trusted sources across Europe.",
    },
  ];

  const leagues = [
    {
      name: "Premier League",
      country: "England",
      colorClass: styles.leaguePurple,
    },
    { name: "La Liga", country: "Spain", colorClass: styles.leagueRed },
    { name: "Bundesliga", country: "Germany", colorClass: styles.leagueGray },
    {
      name: "Champions League",
      country: "Europe",
      colorClass: styles.leagueIndigo,
    },
  ];

  const stats = [
    { number: "4", label: "Top Leagues" },
    { number: "20+", label: "Teams per League" },
    { number: "380+", label: "Matches per Season" },
    { number: "Live", label: "Real-time Updates" },
  ];

  const technologies = [
    {
      name: "Next.js",
      description: "Server-side rendering for optimal performance",
      colorClass: styles.techGray,
    },
    {
      name: "GSAP",
      description: "Engaging user interface with fluid transitions",
      colorClass: styles.techGreen,
    },
    {
      name: "Football-Data API",
      description: "Reliable source for match data and standings",
      icon: <BarChart3 />,
      colorClass: styles.techBlue,
    },
    {
      name: "NewscatcherAPI",
      description: "Latest football news from trusted sources",
      icon: <Newspaper />,
      colorClass: styles.techPurple,
    },
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <div className={styles.heroIcon}>
            <Trophy />
          </div>
          <h1 className={styles.heroTitle}>About TopFlight Tracker</h1>
          <p className={styles.heroDescription}>
            Your ultimate destination for tracking Europe's most prestigious
            football leagues. Get live scores, standings, fixtures, and breaking
            news all in one place.
          </p>
          <div className={styles.buttonContainer}>
            <button className={styles.primaryButton}>Explore Leagues</button>
            <button className={styles.secondaryButton}>View Live Scores</button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <div className={styles.containerInner}>
          <div className={styles.statsGrid}>
            {stats.map((stat, index) => (
              <div key={index} className={styles.statItem}>
                <div className={styles.statNumber}>{stat.number}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className={styles.missionSection}>
        <div className={styles.containerInner}>
          <div className={styles.missionGrid}>
            <div className={styles.missionContent}>
              <h2 className={styles.sectionTitle}>Our Mission</h2>
              <p className={styles.missionText}>
                Football is more than just a game - it's a passion that unites
                millions across the globe. TopFlight Tracker was created to
                bring you closer to the action, providing comprehensive coverage
                of Europe's most elite football competitions.
              </p>
              <p className={styles.missionText}>
                Whether you're tracking your favorite team's journey to glory or
                staying up-to-date with the latest transfer news, we've got you
                covered with real-time data and insights from the beautiful
                game.
              </p>
              <div className={styles.missionFeature}>
                <Globe className={styles.missionIcon} />
                <span>Covering Europe's top football leagues</span>
              </div>
            </div>
            <div className={styles.missionCard}>
              <TrendingUp className={styles.missionCardIcon} />
              <h3 className={styles.missionCardTitle}>Always Current</h3>
              <p className={styles.missionCardText}>
                Real-time updates ensure you never miss a goal, yellow card, or
                crucial moment from your favorite teams and leagues.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Leagues Section */}
      <section className={styles.leaguesSection}>
        <div className={styles.containerInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Leagues We Cover</h2>
            <p className={styles.sectionSubtitle}>
              Follow the action from Europe's most prestigious football
              competitions
            </p>
          </div>
          <div className={styles.leaguesGrid}>
            {leagues.map((league, index) => (
              <div key={index} className={styles.leagueCard}>
                <div className={`${styles.leagueIcon} ${league.colorClass}`}>
                  <Trophy />
                </div>
                <h3 className={styles.leagueTitle}>{league.name}</h3>
                <p className={styles.leagueCountry}>{league.country}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.featuresSection}>
        <div className={styles.containerInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>What We Offer</h2>
            <p className={styles.sectionSubtitle}>
              Everything you need to stay connected with European football
            </p>
          </div>
          <div className={styles.featuresGrid}>
            {features.map((feature, index) => (
              <div key={index} className={styles.featureCard}>
                <div className={styles.featureIcon}>{feature.icon}</div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureDescription}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Section */}
      <section className={styles.technologySection}>
        <div className={styles.containerInner}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              Built with Modern Technology
            </h2>
            <p className={styles.sectionSubtitle}>
              Powered by cutting-edge tools and reliable data sources for the
              best user experience
            </p>
          </div>
          <div className={styles.technologyContainer}>
            <div className={styles.technologyGrid}>
              {technologies.map((tech, index) => (
                <div key={index} className={styles.technologyItem}>
                  <div
                    className={`${styles.technologyIcon} ${tech.colorClass}`}
                  >
                    {tech.icon || (
                      <span className={styles.technologyText}>
                        {tech.name.split(" ")[0]}
                      </span>
                    )}
                  </div>
                  <h3 className={styles.technologyTitle}>{tech.name}</h3>
                  <p className={styles.technologyDescription}>
                    {tech.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className={styles.ctaSection}>
        <div className={styles.containerInner}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              Ready to Track the Beautiful Game?
            </h2>
            <p className={styles.ctaDescription}>
              Join thousands of football fans who rely on TopFlight Tracker for
              the latest scores, standings, and news from Europe's top leagues.
            </p>
            <div className={styles.ctaButtons}>
              <button className={styles.ctaPrimaryButton}>
                View Live Scores
              </button>
              <button className={styles.ctaSecondaryButton}>
                Check Standings
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
