"use client";
import styles from "./styles/Results.module.scss";
import { useState, useMemo } from "react";
import { FaSearch, FaTimes } from "react-icons/fa";

const leagueNames = {
  PL: "Premier League",
  BL1: "Bundesliga",
  PD: "La Liga",
  CL: "Champions League",
};

export default function Results({ results = [], error, leagueCode }) {
  const [filterText, setFilterText] = useState("");

  const filteredResults = useMemo(() => {
    if (!filterText.trim()) return results;

    return results.filter(
      (result) =>
        result.homeTeam.name.toLowerCase().includes(filterText.toLowerCase()) ||
        result.awayTeam.name.toLowerCase().includes(filterText.toLowerCase())
    );
  }, [results, filterText]);

  if (error) {
    return (
      <p className={styles.resultsError}>Error loading results: {error}</p>
    );
  }

  if (!results.length) {
    return (
      <p className={styles.resultsEmpty}>No results available at the moment</p>
    );
  }

  const resultsByDate = filteredResults.reduce((acc, result) => {
    const resultDate = new Date(result.utcDate).toLocaleDateString("en-GB", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    if (!acc[resultDate]) {
      acc[resultDate] = [];
    }
    acc[resultDate].push(result);
    return acc;
  }, {});

  const sortedDates = Object.keys(resultsByDate).sort((a, b) => {
    return new Date(b) - new Date(a);
  });

  const leagueName = leagueNames[leagueCode] || leagueCode;

  const clearFilter = () => {
    setFilterText("");
  };

  return (
    <div className={styles.resultsContainer}>
      <h1>Results for {leagueName}</h1>

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
            Showing {filteredResults.length} of {results.length} results
          </div>
        )}
      </div>
      {sortedDates.map((date) => (
        <div key={date} className={styles.resultsDay}>
          <h2>{date}</h2>
          <table className={styles.resultsTable}>
            <tbody>
              {resultsByDate[date].map((match) => (
                <tr key={match.id} className={styles.resultRow}>
                  <td className={styles.resultHomeTeamBox}>
                    <div className={styles.homeResultsTeamInfo}>
                      <img
                        src={match.homeTeam.crest}
                        alt={`${match.homeTeam.name} logo`}
                        className={styles.resultsTeamLogo}
                      />
                      <span className={styles.resultsHomeTeamName}>
                        {match.homeTeam.name}
                      </span>
                    </div>
                  </td>
                  <td className={styles.resultScoreBox}>
                    <span>
                      {match.score.fullTime.home} - {match.score.fullTime.away}
                    </span>
                  </td>

                  <td className={styles.resultAwayTeamBox}>
                    <div className={styles.awayResultsTeamInfo}>
                      <img
                        src={match.awayTeam.crest}
                        alt={`${match.awayTeam.name} logo`}
                        className={styles.resultsTeamLogo}
                      />
                      <span className={styles.resultsAwayTeamName}>
                        {match.awayTeam.name}
                      </span>
                    </div>
                  </td>
                  <td className={styles.resultsTimeBox}>
                    <div className={styles.timeWrapper}>
                      <span className={styles.time}>
                        {new Date(match.utcDate).toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          minute: "2-digit",
                          timeZone: "America/New_York",
                        })}
                      </span>
                      <span className={styles.timezone}>EST</span>
                    </div>
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
