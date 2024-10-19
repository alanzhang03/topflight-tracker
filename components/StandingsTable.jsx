import "./styles/StandingsTable.scss";

const leagueNames = {
	PL: "Premier League",
	BL1: "Bundesliga",
	SA: "Serie A",
	PD: "La Liga",
	FL1: "Ligue 1",
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
		<div className="standings-container">
			<h1>{leagueName} Standings</h1>
			<table className="standings-table">
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
