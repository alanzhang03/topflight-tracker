// src/components/StandingsTable.jsx
import axios from "axios";
import "./styles/StandingsTable.scss";

export default async function StandingsTable({ leagueCode }) {
	let standings = [];
	let error = null;

	try {
		const response = await axios.get(
			`https://api.football-data.org/v4/competitions/${leagueCode}/standings`,
			{
				headers: {
					"X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY,
				},
			}
		);
		standings = response.data.standings?.[0]?.table || [];
	} catch (err) {
		error = err.message;
	}

	if (error) {
		return <p>Error loading standings: {error}</p>;
	}

	if (standings.length === 0) {
		return <p>No standings data available.</p>;
	}

	return (
		<div className="standings-container">
			<h1>{leagueCode} Standings</h1>
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
							{/* Display logo next to team name */}
							<td className="team-info">
								<img
									src={team.team.crest}
									alt={`${team.team.name} logo`}
									className="team-logo"
								/>
								<span>{team.team.name}</span>
							</td>
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
