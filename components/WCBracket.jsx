"use client";
import { useState, useEffect } from "react";
import styles from "./styles/WCBracket.module.scss";

const ROUND_ORDER = [
  "LAST_32",
  "LAST_16",
  "QUARTER_FINALS",
  "SEMI_FINALS",
  "THIRD_PLACE",
  "FINAL",
];

const ROUND_LABELS = {
  LAST_32: "Round of 32",
  LAST_16: "Round of 16",
  QUARTER_FINALS: "Quarter-finals",
  SEMI_FINALS: "Semi-finals",
  THIRD_PLACE: "Third Place",
  FINAL: "Final",
};

function formatDate(utcDate) {
  return new Date(utcDate).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

function formatTime(utcDate) {
  return new Date(utcDate).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  }) + " EST";
}

function MatchCard({ match }) {
  const finished = match.status === "FINISHED";
  const home = match.homeTeam;
  const away = match.awayTeam;
  const hs = match.score?.fullTime?.home;
  const as = match.score?.fullTime?.away;
  const homeWon = finished && hs > as;
  const awayWon = finished && as > hs;

  return (
    <div className={styles.matchCard}>
      <div className={`${styles.teamRow} ${homeWon ? styles.winner : awayWon ? styles.loser : ""}`}>
        {home.crest && <img src={home.crest} alt={home.name} className={styles.crest} />}
        <span className={styles.teamName}>{home.name ?? "TBD"}</span>
        {finished && <span className={homeWon ? styles.scoreWin : styles.scoreLose}>{hs}</span>}
      </div>
      <div className={`${styles.teamRow} ${awayWon ? styles.winner : homeWon ? styles.loser : ""}`}>
        {away.crest && <img src={away.crest} alt={away.name} className={styles.crest} />}
        <span className={styles.teamName}>{away.name ?? "TBD"}</span>
        {finished && <span className={awayWon ? styles.scoreWin : styles.scoreLose}>{as}</span>}
      </div>
      {!finished && (
        <div className={styles.matchTime}>
          {formatDate(match.utcDate)} - {formatTime(match.utcDate)}
        </div>
      )}
    </div>
  );
}

export default function WCBracket() {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeRound, setActiveRound] = useState(null);

  useEffect(() => {
    fetch("/api/world-cup/matches")
      .then((r) => r.json())
      .then((data) => {
        if (data.matches) {
          const knockout = data.matches.filter((m) =>
            ROUND_ORDER.includes(m.stage)
          );
          setMatches(knockout);
          const firstRound = ROUND_ORDER.find((r) =>
            knockout.some((m) => m.stage === r)
          );
          setActiveRound(firstRound ?? ROUND_ORDER[0]);
        } else {
          setError(data.error || "Failed to load matches");
        }
      })
      .catch(() => setError("Failed to load matches"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className={styles.status}>Loading bracket...</p>;
  if (error) return <p className={styles.statusError}>{error}</p>;
  if (!matches.length)
    return <p className={styles.status}>Knockout stage has not started yet.</p>;

  const availableRounds = ROUND_ORDER.filter((r) =>
    matches.some((m) => m.stage === r)
  );
  const roundMatches = matches
    .filter((m) => m.stage === activeRound)
    .sort((a, b) => new Date(a.utcDate) - new Date(b.utcDate));

  return (
    <div className={styles.container}>
      <h1>2026 World Cup - Knockout Stage</h1>

      <div className={styles.tabs}>
        {availableRounds.map((r) => (
          <button
            key={r}
            className={`${styles.tab} ${activeRound === r ? styles.tabActive : ""}`}
            onClick={() => setActiveRound(r)}
          >
            {ROUND_LABELS[r]}
          </button>
        ))}
      </div>

      <div className={styles.roundTitle}>{ROUND_LABELS[activeRound]}</div>

      <div className={styles.matchGrid}>
        {roundMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </div>
  );
}
