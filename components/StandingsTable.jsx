import axios from "axios";

export async function getServerSideProps() {
  try {
    const response = await axios.get(
      `https://api.football-data.org/v4/competitions/PL/standings`,
      {
        headers: {
          "X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY,
        },
      }
    );

    return {
      props: {
        standings: response.data.standings?.[0]?.table || [], // Send standings data as props
      },
    };
  } catch (error) {
    return {
      props: {
        error: error.message,
      },
    };
  }
}

export default function StandingsTable({ standings = [], error }) {
  if (error) {
    return <p>Error loading standings: {error}</p>;
  }

  if (standings.length === 0) {
    return <p>No standings data available.</p>; // Handle empty data
  }

  return (
    <div>
      <h1>Premier League Standings</h1>
      <table>
        <thead>
          <tr>
            <th>Position</th>
            <th>Team</th>
            <th>Points</th>
            <th>Played</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Draws</th>
            <th>Goal Difference</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team) => (
            <tr key={team.team.id}>
              <td>{team.position}</td>
              <td>{team.team.name}</td>
              <td>{team.points}</td>
              <td>{team.playedGames}</td>
              <td>{team.won}</td>
              <td>{team.lost}</td>
              <td>{team.draw}</td>
              <td>{team.goalDifference}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
