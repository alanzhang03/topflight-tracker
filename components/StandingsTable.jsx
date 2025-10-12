"use client";
import styles from "./styles/StandingsTable.module.scss";
import { useState, useMemo } from "react";
import { FaArrowUp, FaArrowDown, FaSearch, FaTimes } from "react-icons/fa";
import { FaArrowsUpDown } from "react-icons/fa6";

const leagueNames = {
  PL: "Premier League",
  BL1: "Bundesliga",
  PD: "La Liga",
  CL: "Champions League",
};

export default function StandingsTable({ standings = [], error, leagueCode }) {
  const [sortConfig, setSortConfig] = useState({
    direction: "asc",
    key: null,
  });
  const [filterText, setFilterText] = useState("");

  const filteredAndSortedStandings = useMemo(() => {
    // First filter by team name
    let filtered = standings;
    if (filterText.trim()) {
      filtered = standings.filter((team) =>
        team.team.name.toLowerCase().includes(filterText.toLowerCase())
      );
    }

    // Then sort if needed
    if (!sortConfig.key) return filtered;

    return [...filtered].sort((a, b) => {
      let aValue, bValue;
      switch (sortConfig.key) {
        case "position":
          aValue = a.position;
          bValue = b.position;
          break;
        case "team":
          aValue = a.team.name;
          bValue = b.team.name;
          break;
        case "played":
          aValue = a.playedGames;
          bValue = b.playedGames;
          break;
        case "wins":
          aValue = a.won;
          bValue = b.won;
          break;
        case "losses":
          aValue = a.lost;
          bValue = b.lost;
          break;
        case "draws":
          aValue = a.draw;
          bValue = b.draw;
          break;
        case "goalDifference":
          aValue = a.goalDifference;
          bValue = b.goalDifference;
          break;
        case "points":
          aValue = a.points;
          bValue = b.points;
          break;
        default:
          return 0;
      }
      if (typeof aValue === "string") {
        if (sortConfig.direction === "asc") {
          return aValue.localeCompare(bValue);
        } else {
          return bValue.localeCompare(aValue);
        }
      } else {
        if (sortConfig.direction === "asc") {
          return aValue - bValue;
        } else {
          return bValue - aValue;
        }
      }
    });
  }, [standings, sortConfig, filterText]);

  // NOW you can do conditional returns
  if (error) {
    return <p>Error loading standings: {error}</p>;
  }

  if (standings.length === 0) {
    return <p>No standings data available.</p>;
  }

  const leagueName = leagueNames[leagueCode] || leagueCode;

  const getSortIndicator = (key) => {
    if (sortConfig.key !== key)
      return (
        <>
          {" "}
          <FaArrowsUpDown />
        </>
      );
    return sortConfig.direction === "asc" ? (
      <>
        {" "}
        <FaArrowUp />
      </>
    ) : (
      <>
        {" "}
        <FaArrowDown />
      </>
    );
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const clearFilter = () => {
    setFilterText("");
  };

  return (
    <div className={styles.standingsContainer}>
      <h1>{leagueName} Standings</h1>

      {/* Search Filter Bar */}
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
            Showing {filteredAndSortedStandings.length} of {standings.length}{" "}
            teams
          </div>
        )}
      </div>

      <table className={styles.standingsTable}>
        <thead>
          <tr>
            <th
              onClick={() => handleSort("position")}
              style={{ cursor: "pointer" }}
            >
              Position{getSortIndicator("position")}
            </th>
            <th
              className={styles.standingsTeamHeader}
              onClick={() => handleSort("team")}
              style={{ cursor: "pointer" }}
            >
              Club{getSortIndicator("team")}
            </th>
            <th
              onClick={() => handleSort("played")}
              style={{ cursor: "pointer" }}
            >
              Played{getSortIndicator("played")}
            </th>
            <th
              onClick={() => handleSort("wins")}
              style={{ cursor: "pointer" }}
            >
              Wins{getSortIndicator("wins")}
            </th>
            <th
              onClick={() => handleSort("losses")}
              style={{ cursor: "pointer" }}
            >
              Losses{getSortIndicator("losses")}
            </th>
            <th
              onClick={() => handleSort("draws")}
              style={{ cursor: "pointer" }}
            >
              Draws{getSortIndicator("draws")}
            </th>
            <th
              onClick={() => handleSort("goalDifference")}
              style={{ cursor: "pointer" }}
            >
              GD{getSortIndicator("goalDifference")}
            </th>
            <th
              onClick={() => handleSort("points")}
              style={{ cursor: "pointer" }}
            >
              Points{getSortIndicator("points")}
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredAndSortedStandings.map((team) => (
            <tr key={team.team.id}>
              <td className={styles.standingsTeamPosition}>{team.position}</td>

              <td className={styles.teamInfo}>
                <img
                  src={team.team.crest}
                  alt={`${team.team.name} logo`}
                  className={styles.teamLogo}
                />
                <span>{team.team.name}</span>
              </td>

              <td>{team.playedGames}</td>
              <td>{team.won}</td>
              <td>{team.lost}</td>
              <td>{team.draw}</td>
              <td
                className={
                  team.goalDifference > 0
                    ? styles.goalPositive
                    : team.goalDifference < 0
                    ? styles.goalNegative
                    : ""
                }
              >
                {team.goalDifference}
              </td>
              <td className={styles.standingsPoints}>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
