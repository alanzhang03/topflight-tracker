"use client";

import React, { useEffect } from "react";
import styles from "./styles/MainPageDisplay.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import ScrollTrigger from "gsap/ScrollTrigger";

const MainPageDisplay = () => {
  const handleGetStartedClick = () => {
    const aboutSection = document.querySelector(`.${styles.aboutSection}`);
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.to(`.${styles.heroContent}`, {
      delay: 0.25,
      opacity: 1,
      duration: 1,
      scale: 1,
    });

    gsap.to(`.${styles.aboutSection} h2`, {
      scrollTrigger: `.${styles.aboutSection} h2`,
      delay: 0.25,
      opacity: 1,
      duration: 2,
    });

    gsap.to(`.${styles.aboutSection} p`, {
      scrollTrigger: `.${styles.aboutSection} p`,
      delay: 0.5,
      opacity: 1,
      duration: 2,
    });

    gsap.to(`.${styles.leaguesSection} h2`, {
      scrollTrigger: `.${styles.leaguesSection} h2`,
      delay: 0.75,
      opacity: 1,
      duration: 2,
    });

    gsap.to(`.${styles.leagueCard} img`, {
      scrollTrigger: `.${styles.leagueCard} img`,
      delay: 1,
      opacity: 1,
      duration: 1.5,
      stagger: {
        each: 0.2,
        grid: "auto",
        from: "start",
      },
    });

    gsap.to(`.${styles.ctaSectionGsap}`, {
      scrollTrigger: `.${styles.ctaSectionGsap}`,
      delay: 0.5,
      opacity: 1,
      duration: 2,
    });
  }, []);

  return (
    <div className={styles.mainPageContainer}>
      <div className={styles.heroSection}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroContentHeader}>
            Welcome to the TopFlight Tracker
          </h1>
          <p className={styles.heroContentParagraph}>
            Explore detailed standings, match history, lineups, and more from
            the Premier League, La Liga, Bundesliga, and Champions League.
          </p>
          <button className={styles.ctaButton} onClick={handleGetStartedClick}>
            Get Started
          </button>
        </div>
      </div>

      <section className={styles.aboutSection}>
        <h2>About TopFlight Tracker</h2>
        <p>
          TopFlight Tracker is your go-to website for real-time updates on
          football leagues, including standings, fixtures, and team lineups.
          Stay up-to-date with every match and follow your favorite teams
          through our intuitive and user-friendly platform.
        </p>
      </section>

      <section className={styles.leaguesSection}>
        <h2>Explore the Top Leagues</h2>
        <div className={styles.leaguesContainer}>
          <div className={styles.leagueCard}>
            <Link
              href="/leagues/premier-league"
              rel="noopener noreferrer"
              className={styles.newsItemLink}
            >
              <img src="/images/premier-league.svg" alt="Premier League" />
            </Link>
          </div>
          <div className={styles.leagueCard}>
            <Link
              href="/leagues/bundesliga"
              rel="noopener noreferrer"
              className={styles.newsItemLink}
            >
              <img src="/images/bundesliga.svg" alt="Bundesliga" />
            </Link>
          </div>
          <div className={styles.leagueCard}>
            <Link
              href="/leagues/la-liga"
              rel="noopener noreferrer"
              className={styles.newsItemLink}
            >
              <img src="/images/la-liga.svg" alt="La Liga" />
            </Link>
          </div>
          <div className={styles.leagueCard}>
            <Link
              href="/leagues/champions-league"
              rel="noopener noreferrer"
              className={styles.newsItemLink}
            >
              <img src="/images/champions-league.svg" alt="Champions League" />
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaSectionGsap}>
          <h2>Start Tracking Your Favorite Leagues and Teams Now</h2>
          <p>
            Discover match fixtures, recent results, team lineups, and standings
            in real-time for all your favorite leagues and teams. Click the
            button down below to start exploring.
          </p>
          <Link href="/favorites/" rel="noopener referrer">
            <button className={styles.ctaButtonSecondary}>Track Matches</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MainPageDisplay;
