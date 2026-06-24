"use client";
import styles from "./styles/FavoriteTeamCard.module.scss";

const leagueNames = {
  PL: "Premier League",
  BL1: "Bundesliga",
  PD: "La Liga",
  CL: "Champions League",
};

function formatDate(utcDate) {
  return new Date(utcDate).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
}

function formatKickoff(utcDate) {
  return (
    new Date(utcDate).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: "America/New_York",
    }) + " EST"
  );
}

export default function FavoriteTeamCard({ team, fixtures, results, onRemove }) {
  const leagueName = leagueNames[team.leagueCode] || team.leagueCode;

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.teamInfo}>
          <img src={team.crest} alt={team.name} className={styles.crest} />
          <span className={styles.teamName}>{team.name}</span>
        </div>
        <div className={styles.headerRight}>
          <span className={styles.leagueBadge}>{leagueName}</span>
          <button
            className={styles.removeBtn}
            onClick={() => onRemove(team)}
            aria-label="Remove from favorites"
          >
            &#x2715;
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.sectionTitle}>Recent Results</p>
        {results.length === 0 ? (
          <p className={styles.empty}>No recent results</p>
        ) : (
          <div className={styles.chipsRow}>
            {results.map((match) => {
              const isHome = match.homeTeam.id === team.id;
              const teamScore = isHome
                ? match.score.fullTime.home
                : match.score.fullTime.away;
              const oppScore = isHome
                ? match.score.fullTime.away
                : match.score.fullTime.home;
              const opponent = isHome ? match.awayTeam : match.homeTeam;
              const outcome =
                teamScore > oppScore ? "W" : teamScore < oppScore ? "L" : "D";
              const outcomeClass =
                outcome === "W"
                  ? styles.win
                  : outcome === "L"
                  ? styles.loss
                  : styles.draw;

              return (
                <div key={match.id} className={styles.chip}>
                  <div className={styles.chipTop}>
                    <span className={styles.badge + " " + outcomeClass}>
                      {outcome}
                    </span>
                    <span className={styles.chipScore}>
                      {teamScore}{" - "}{oppScore}
                    </span>
                  </div>
                  <span className={styles.chipOpponent}>
                    {isHome ? "vs" : "at"} {opponent.name}
                  </span>
                  <span className={styles.chipDate}>
                    {formatDate(match.utcDate)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className={styles.section}>
        <p className={styles.sectionTitle}>Upcoming Fixtures</p>
        {fixtures.length === 0 ? (
          <p className={styles.empty}>No upcoming fixtures</p>
        ) : (
          <div className={styles.chipsRow}>
            {fixtures.map((match) => {
              const isHome = match.homeTeam.id === team.id;

              return (
                <div key={match.id} className={styles.chip}>
                  <div className={styles.chipMatchup}>
                    <span
                      className={
                        isHome ? styles.myTeam : styles.otherTeam
                      }
                    >
                      {match.homeTeam.name}
                    </span>
                    <span className={styles.vs}>vs</span>
                    <span
                      className={
                        !isHome ? styles.myTeam : styles.otherTeam
                      }
                    >
                      {match.awayTeam.name}
                    </span>
                  </div>
                  <span className={styles.chipDate}>
                    {formatDate(match.utcDate)} · {formatKickoff(match.utcDate)}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
