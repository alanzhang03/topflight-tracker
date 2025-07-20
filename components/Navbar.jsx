"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles/Navbar.module.scss";
import { MdOutlineLeaderboard } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { IoMedalOutline } from "react-icons/io5";

export default function Navbar({ league }) {
  const leagueUrls = {
    epl: {
      name: "Premier League",
      standings: "/leagues/premier-league/standings",
      fixtures: "/leagues/premier-league/fixtures",
      results: "/leagues/premier-league/results",
    },
    laliga: {
      name: "La Liga",
      standings: "/leagues/la-liga/standings",
      fixtures: "/leagues/la-liga/fixtures",
      results: "/leagues/la-liga/results",
    },
    championsleague: {
      name: "Champions League",
      standings: "/leagues/champions-league/standings",
      fixtures: "/leagues/champions-league/fixtures",
      results: "/leagues/champions-league/results",
    },
    bundesliga: {
      name: "Bundesliga",
      standings: "/leagues/bundesliga/standings",
      fixtures: "/leagues/bundesliga/fixtures",
      results: "/leagues/bundesliga/results",
    },
  };

  const currentLeague = leagueUrls[league];
  const pathname = usePathname();

  if (!currentLeague) {
    return <div className={styles.navbarError}>League not found</div>;
  }

  return (
    <nav className={styles.navbarProp}>
      <div className={styles.navbarContainerProp}>
        <ul className={styles.navbarMenuProp}>
          <li
            className={
              pathname === currentLeague.standings ? styles.active : ""
            }
          >
            <Link href={currentLeague.standings}>
              <div className={styles.resultsNavbarContainer}>
                <MdOutlineLeaderboard />
                Standings
              </div>
            </Link>
          </li>
          <li
            className={pathname === currentLeague.fixtures ? styles.active : ""}
          >
            <Link href={currentLeague.fixtures}>
              <div className={styles.resultsNavbarContainer}>
                <IoCalendarOutline />
                Fixtures
              </div>
            </Link>
          </li>
          <li
            className={pathname === currentLeague.results ? styles.active : ""}
          >
            <Link href={currentLeague.results}>
              <div className={styles.resultsNavbarContainer}>
                <IoMedalOutline />
                Results
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
