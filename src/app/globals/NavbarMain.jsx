"use client";
import React from "react";
import Link from "next/link";
import { ThemeToggle } from "../../../components/ThemeToggle";
import styles from "./NavbarMain.module.scss";

const NavbarMain = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainer}>
        <ul className={styles.navbarMenu}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/favorites">Favorites</Link>
          </li>
          <li>
            <Link href="/leagues/premier-league">Premier League</Link>
          </li>
          <li>
            <Link href="/leagues/la-liga">La Liga</Link>
          </li>
          <li>
            <Link href="/leagues/champions-league">Champions League</Link>
          </li>
          <li>
            <Link href="/leagues/bundesliga">Bundesliga</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavbarMain;
