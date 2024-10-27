import "./styles/Results.scss";

const leagueNames = {
	PL: "Premier League",
	BL1: "Bundesliga",
	PD: "La Liga",
	CL: "Champions League",
};

export default function Results({ results = [], error, leagueCode }) {
	if (error) {
		return <p>Error loading results: {error}</p>;
	}

	if (!results.length) {
		return <p>No results available.</p>;
	}

	const resultsByDate = results.reduce((acc, result) => {
		const resultDate = new Date(result.utcDate).toLocaleDateString("en-GB", {
			weekday: "long",
			day: "numeric",
			month: "long",
			year: "numeric",
		});
		if (!acc[resultDate]) {
			acc[resultDate] = [];
		}
		acc[resultDate].push(result);
		return acc;
	}, {});

	const sortedDates = Object.keys(resultsByDate).sort((a, b) => {
		return new Date(b) - new Date(a);
	});

	const leagueName = leagueNames[leagueCode] || leagueCode;

	return (
		<div className="results-container">
			<h1>Results for {leagueName}</h1>
			{sortedDates.map((date) => (
				<div key={date} className="results-day">
					<h2>{date}</h2>
					<table className="results-table">
						<tbody>
							{resultsByDate[date].map((match) => (
								<tr key={match.id} className="result-row">
									<td className="result-home-team-box">
										<div className="home-results-team-info">
											<img
												src={match.homeTeam.crest}
												alt={`${match.homeTeam.name} logo`}
												className="results-team-logo"
											/>
											<span className="results-home-team-name">
												{match.homeTeam.name}
											</span>
										</div>
									</td>
									<td className="result-scoreBox">
										<span>
											{match.score.fullTime.home} - {match.score.fullTime.away}
										</span>
									</td>

									<td className="result-away-team-box">
										<div className="away-results-team-info">
											<img
												src={match.awayTeam.crest}
												alt={`${match.awayTeam.name} logo`}
												className="results-team-logo"
											/>
											<span className="results-away-team-name">
												{match.awayTeam.name}
											</span>
										</div>
									</td>
									<td className="results-time-box">
										{new Date(match.utcDate).toLocaleTimeString("en-US", {
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
