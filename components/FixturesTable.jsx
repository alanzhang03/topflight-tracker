// src/components/FixturesTable.jsx
import axios from "axios";
import "./styles/FixturesTable.scss";

export default async function FixturesTable({ leagueCode }) {
	let fixtures = [];
	let error = null;

	try {
		// Fetch upcoming fixtures from the API
		const response = await axios.get(
			`https://api.football-data.org/v4/competitions/${leagueCode}/matches`,
			{
				headers: {
					"X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY,
				},
				params: {
					status: "SCHEDULED", // Only fetch upcoming fixtures
				},
			}
		);
		fixtures = response.data.matches || [];
	} catch (err) {
		error = err.message;
	}

	if (error) {
		return <p>Error loading fixtures: {error}</p>;
	}

	if (fixtures.length === 0) {
		return <p>No upcoming fixtures available.</p>;
	}

	// Group fixtures by date
	const fixturesByDate = fixtures.reduce((acc, fixture) => {
		const fixtureDate = new Date(fixture.utcDate).toLocaleDateString();
		if (!acc[fixtureDate]) {
			acc[fixtureDate] = [];
		}
		acc[fixtureDate].push(fixture);
		return acc;
	}, {});

	return (
		<div className="fixtures-container">
			<h1>Upcoming Fixtures for {leagueCode}</h1>
			{Object.keys(fixturesByDate).map((date) => (
				<div key={date} className="fixtures-day">
					<h2>{date}</h2>
					<table>
						<tbody>
							{fixturesByDate[date].map((fixture) => (
								<tr key={fixture.id} className="fixture-row">
									<td>
										<img
											src={fixture.homeTeam.crest}
											alt={`${fixture.homeTeam.name} logo`}
											className="team-logo"
										/>
										<span>{fixture.homeTeam.name}</span>
									</td>
									<td>vs</td>
									<td>
										<img
											src={fixture.awayTeam.crest}
											alt={`${fixture.awayTeam.name} logo`}
											className="team-logo"
										/>
										<span>{fixture.awayTeam.name}</span>
									</td>
									<td>
										{new Date(fixture.utcDate).toLocaleTimeString([], {
											hour: "2-digit",
											minute: "2-digit",
										})}{" "}
										GMT
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
