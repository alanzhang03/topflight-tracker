"use client";

import React from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./styles/HomepageDisplay.module.scss";

const HomepageDisplay = ({
  leagueName,
  leagueCode,
  logo,
  description,
  routeLinks,
}) => {
  gsap.registerPlugin(ScrollTrigger);

  useGSAP(() => {
    gsap.set(`.${styles.leagueLogo}`, {
      y: -200,
      opacity: 0,
    });

    gsap.set(`.${styles.homepageHeader}`, {
      y: -200,
      opacity: 0,
    });

    gsap.set(`.${styles.homepageParagraph}`, {
      opacity: 0,
    });

    gsap.set(`.${styles.navLink}`, {
      opacity: 0,
    });

    gsap.to(`.${styles.leagueLogo}`, {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    });

    gsap.to(`.${styles.homepageHeader}`, {
      delay: 0.5,
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    });

    gsap.to(`.${styles.homepageParagraph}`, {
      delay: 1,
      opacity: 1,
      duration: 1,
      ease: "power2.out",
    });

    gsap.to(`.${styles.navLink}`, {
      delay: 1.25,
      opacity: 1,
      duration: 2,
      stagger: {
        each: 0.2,
        grid: "auto",
        from: "start",
      },
      ease: "power2.out",
    });
  }, []);

  return (
    <div className={styles.homepageContainer}>
      <div className={styles.homepageHeroSection}>
        <div className={styles.homepageHeroContent}>
          <img
            src={logo}
            alt={`${leagueName} logo`}
            className={styles.leagueLogo}
          />
          <h1 className={styles.homepageHeader}>
            Welcome to {leagueName} Page
          </h1>
          <p className={styles.homepageParagraph}>{description}</p>
        </div>
        <nav className={styles.leagueNav}>
          {routeLinks.map((link, index) => (
            <Link key={index} href={link.path} className={styles.navLink}>
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default HomepageDisplay;
