import styles from "./styles/FixturesTable.module.scss";

const leagueNames = {
  PL: "Premier League",
  BL1: "Bundesliga",
  PD: "La Liga",
  CL: "Champions League",
};

export default function FixturesTable({ fixtures = [], error, leagueCode }) {
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

  const fixturesByDate = fixtures.reduce((acc, fixture) => {
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

  return (
    <div className={styles.fixturesContainer}>
      <h1>Upcoming Fixtures for {leagueName}</h1>
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
