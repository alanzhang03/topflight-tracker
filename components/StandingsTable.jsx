import styles from "./styles/StandingsTable.module.scss";

const leagueNames = {
  PL: "Premier League",
  BL1: "Bundesliga",
  PD: "La Liga",
  CL: "Champions League",
};

export default function StandingsTable({ standings = [], error, leagueCode }) {
  if (error) {
    return <p>Error loading standings: {error}</p>;
  }

  if (standings.length === 0) {
    return <p>No standings data available.</p>;
  }

  const leagueName = leagueNames[leagueCode] || leagueCode;

  return (
    <div className={styles.standingsContainer}>
      <h1>{leagueName} Standings</h1>
      <table className={styles.standingsTable}>
        <thead>
          <tr>
            <th>Position</th>
            <th className={styles.standingsTeamHeader}>Club</th>
            <th>Played</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Draws</th>
            <th>GD</th>
            <th>Points</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team) => (
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
                  team.goalDifference >= 0
                    ? styles.goalPositive
                    : styles.goalNegative
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
