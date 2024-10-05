import axios from "axios";
import "./styles/Results.scss";

const leagueNames = {
	PL: "Premier League",
	BL1: "Bundesliga",
	SA: "Serie A",
	PD: "La Liga",
	FL1: "Ligue 1",
	CL: "Champions League",
};

export default async function Results({ leagueCode }) {
	let results = [];
	let error = null;

	try {
		const response = await axios.get(
			`https://api.football-data.org/v4/competitions/${leagueCode}/matches`,
			{
				headers: {
					"X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY,
				},
				params: {
					status: "FINISHED",
				},
			}
		);
		results = response.data.matches || [];
	} catch (err) {
		error = err.message;
		console.log("API Error:", error);
	}

	if (error) {
		return <p>Error loading results: {error}</p>;
	}

	if (results.length === 0) {
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
					<table>
						<tbody>
							{resultsByDate[date].map((match) => (
								<tr key={match.id} className="result-row">
									<td className="team-info">
										<img
											src={match.homeTeam.crest}
											alt={`${match.homeTeam.name} logo`}
											className="team-logo"
										/>
										<span>{match.homeTeam.name}</span>
									</td>
									<td>
										<span>
											{match.score.fullTime.home} - {match.score.fullTime.away}
										</span>
									</td>
									<td className="team-info">
										<img
											src={match.awayTeam.crest}
											alt={`${match.awayTeam.name} logo`}
											className="team-logo"
										/>
										<span>{match.awayTeam.name}</span>
									</td>
									<td>
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
