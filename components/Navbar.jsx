import React from "react";
import Link from "next/link";
import "./styles/Navbar.scss";

export default function Navbar({ league }) {
  const leagueUrls = {
    epl: {
      name: "Premier League",
      standings: "/leagues/premier-league/standings",
      clubs: "/leagues/premier-league/teams",
      fixtures: "/leagues/premier-league/fixtures",
    },
    bundesliga: {
      name: "Bundesliga",
      standings: "/leagues/bundesliga/standings",
      clubs: "/leagues/bundesliga/teams",
      fixtures: "/leagues/bundesliga/fixtures",
    },
    laliga: {
      name: "La Liga",
      standings: "/leagues/la-liga/standings",
      clubs: "/leagues/la-liga/teams",
      fixtures: "/leagues/la-liga/fixtures",
    },
    championsleague: {
      name: "Champions League",
      standings: "/leagues/champions-league/standings",
      clubs: "/leagues/champions-league/teams",
      fixtures: "/leagues/champions-league/fixtures",
    },
  };

  const currentLeague = leagueUrls[league];

  // Fallback if no league is detected
  if (!currentLeague) {
    return <div>League not found</div>;
  }

  return (
    <nav className="navbar-prop">
      <div className="navbar-container-prop">
        <ul className="navbar-menu-prop">
          <li>
            <Link href={currentLeague.standings}>Standings</Link>
          </li>
          <li>
            <Link href={currentLeague.clubs}>Clubs</Link>
          </li>
          <li>
            <Link href={currentLeague.fixtures}>Fixtures</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
