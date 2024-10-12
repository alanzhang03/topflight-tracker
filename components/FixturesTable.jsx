import "./styles/FixturesTable.scss";

const leagueNames = {
	PL: "Premier League",
	BL1: "Bundesliga",
	SA: "Serie A",
	PD: "La Liga",
	FL1: "Ligue 1",
	CL: "Champions League",
};

export default function FixturesTable({ fixtures = [], error, leagueCode }) {
	if (error) {
		return <p>Error loading fixtures: {error}</p>;
	}

	if (!fixtures.length) {
		return <p>No upcoming fixtures available.</p>;
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
		<div className="fixtures-container">
			<h1>Upcoming Fixtures for {leagueName}</h1>
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
