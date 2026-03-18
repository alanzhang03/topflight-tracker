"use client";

import React, { useEffect } from "react";
import styles from "./styles/MainPageDisplay.module.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Link from "next/link";
import ScrollTrigger from "gsap/ScrollTrigger";

const MainPageDisplay = () => {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.to(`.${styles.heroContent}`, {
      delay: 0.25,
      opacity: 1,
      duration: 1,
      y: 0,
    });

    gsap.to(`.${styles.aboutSection} h2`, {
      scrollTrigger: `.${styles.aboutSection} h2`,
      delay: 0.25,
      opacity: 1,
      duration: 2,
    });

    gsap.to(`.${styles.statPill}`, {
      scrollTrigger: `.${styles.statsRow}`,
      delay: 0.25,
      opacity: 1,
      duration: 0.6,
      y: 0,
      stagger: 0.1,
    });

    gsap.to(`.${styles.leaguesSection} h2`, {
      scrollTrigger: `.${styles.leaguesSection} h2`,
      delay: 0.75,
      opacity: 1,
      duration: 2,
    });

    gsap.to(`.${styles.leagueCard}`, {
      scrollTrigger: `.${styles.leagueCard}`,
      delay: 0.5,
      opacity: 1,
      duration: 0.6,
      y: 0,
      stagger: 0.12,
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
          <span className={styles.heroBadge}>Live Football Data</span>
          <h1 className={styles.heroContentHeader}>
            Track Every Match.<br />Follow Every League.
          </h1>
          <p className={styles.heroContentParagraph}>
            Real-time standings, fixtures, and results from the Premier League,
            La Liga, Bundesliga, and Champions League.
          </p>
          <div className={styles.heroActions}>
            <Link href="/leagues/premier-league">
              <button className={styles.ctaButton}>Explore Leagues</button>
            </Link>
          </div>
        </div>
      </div>

      <section className={styles.aboutSection}>
        <h2>Your Football Hub</h2>
        <div className={styles.statsRow}>
          <div className={styles.statPill}>
            <span className={styles.statNumber}>4</span>
            <span className={styles.statLabel}>Leagues</span>
          </div>
          <div className={styles.statPill}>
            <span className={styles.statNumber}>Live</span>
            <span className={styles.statLabel}>Standings</span>
          </div>
          <div className={styles.statPill}>
            <span className={styles.statNumber}>Real-time</span>
            <span className={styles.statLabel}>Results</span>
          </div>
          <div className={styles.statPill}>
            <span className={styles.statNumber}>Free</span>
            <span className={styles.statLabel}>Always</span>
          </div>
        </div>
      </section>

      <section className={styles.leaguesSection}>
        <h2>Explore the Top Leagues</h2>
        <div className={styles.leaguesContainer}>
          <Link href="/leagues/premier-league" className={styles.leagueCard}>
            <img src="/images/premier-league.svg" alt="Premier League" />
            <p>Premier League</p>
          </Link>
          <Link href="/leagues/bundesliga" className={styles.leagueCard}>
            <img src="/images/bundesliga.svg" alt="Bundesliga" />
            <p>Bundesliga</p>
          </Link>
          <Link href="/leagues/la-liga" className={styles.leagueCard}>
            <img src="/images/la-liga.svg" alt="La Liga" />
            <p>La Liga</p>
          </Link>
          <Link href="/leagues/champions-league" className={styles.leagueCard}>
            <img src="/images/champions-league.svg" alt="Champions League" />
            <p>Champions League</p>
          </Link>
        </div>
      </section>

      <section className={styles.ctaSection}>
        <div className={styles.ctaSectionGsap}>
          <h2>Start Tracking Now</h2>
          <p>
            Fixtures, results, and standings — all in one place.
          </p>
          <Link href="/leagues/premier-league">
            <button className={styles.ctaButtonSecondary}>Get Started</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default MainPageDisplay;
