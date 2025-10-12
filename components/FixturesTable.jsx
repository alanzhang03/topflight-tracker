// import "./styles/FixturesTable.scss"
"use client";
import styles from "./styles/FixturesTable.module.scss";
import { useState, useMemo } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const leagueNames = {
  PL: "Premier League",
  BL1: "Bundesliga",
  PD: "La Liga",
  CL: "Champions League",
};

export default function FixturesTable({ fixtures = [], error, leagueCode }) {
  const [filterText, setFilterText] = useState("");

  if (error) {
    return (
      <p className={styles.fixturesError}>Error loading fixtures: {error}</p>
    );
  }

  if (!fixtures.length) {
    return (
      <p className={styles.fixturesEmpty}>No upcoming fixtures available.</p>
    );
  }

  const filteredFixtures = useMemo(() => {
    if (!filterText.trim()) return fixtures;

    return fixtures.filter(
      (fixture) =>
        fixture.homeTeam.name
          .toLowerCase()
          .includes(filterText.toLowerCase()) ||
        fixture.awayTeam.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [fixtures, filterText]);

  const fixturesByDate = filteredFixtures.reduce((acc, fixture) => {
    const fixtureDate = new Date(fixture.utcDate).toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    if (!acc[fixtureDate]) {
      acc[fixtureDate] = [];
    }
    acc[fixtureDate].push(fixture);
    return acc;
  }, {});

  const leagueName = leagueNames[leagueCode] || leagueCode;

  const clearFilter = () => {
    setFilterText("");
  };

  return (
    <div className={styles.fixturesContainer}>
      <h1>Upcoming Fixtures for {leagueName}</h1>

      <div className={styles.searchContainer}>
        <div className={styles.searchInputWrapper}>
          <FaSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search for a team..."
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            className={styles.searchInput}
          />
          {filterText && (
            <button
              onClick={clearFilter}
              className={styles.clearButton}
              aria-label="Clear search"
            >
              <FaTimes />
            </button>
          )}
        </div>
        {filterText && (
          <div className={styles.filterResults}>
            Showing {filteredFixtures.length} of {fixtures.length} fixtures
          </div>
        )}
      </div>
      {Object.keys(fixturesByDate).map((date) => (
        <div key={date} className={styles.fixturesDay}>
          <h2>{date}</h2>
          <table className={styles.fixturesTable}>
            <tbody>
              {fixturesByDate[date].map((fixture) => (
                <tr key={fixture.id} className={styles.fixtureRow}>
                  <td className={styles.fixtureHomeTeamBox}>
                    <div className={styles.fixturesHomeTeamInfo}>
                      <img
                        src={fixture.homeTeam.crest}
                        alt={`${fixture.homeTeam.name} logo`}
                        className={styles.teamLogo}
                      />
                      <span className={styles.fixturesHomeTeamName}>
                        {fixture.homeTeam.name}
                      </span>
                    </div>
                  </td>
                  <td className={styles.fixturesVsBox}>vs</td>
                  <td className={styles.fixtureAwayTeamBox}>
                    <div className={styles.fixturesAwayTeamInfo}>
                      <img
                        src={fixture.awayTeam.crest}
                        alt={`${fixture.awayTeam.name} logo`}
                        className={styles.teamLogo}
                      />
                      <span className={styles.fixturesAwayTeamName}>
                        {fixture.awayTeam.name}
                      </span>
                    </div>
                  </td>
                  <td className={styles.fixturesTimeBox}>
                    {new Date(fixture.utcDate).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      timeZone: "America/New_York",
                    })}{" "}
                    EST
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
