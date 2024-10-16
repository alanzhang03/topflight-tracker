import "./styles/ClubsDisplay.scss";

const leagueNames = {
	PL: "Premier League",
	BL1: "Bundesliga",
	SA: "Serie A",
	PD: "La Liga",
	FL1: "Ligue 1",
	CL: "Champions League",
};

export default function ClubsDisplay({
	clubs = [],
	error,
	leagueCode,
	teamLinks,
}) {
	if (error) {
		return <p>Error loading clubs: {error}</p>;
	}

	if (!clubs.length) {
		return <p>No clubs data available.</p>;
	}

	const leagueName = leagueNames[leagueCode] || leagueCode;

	return (
		<div className="clubs-container">
			<h1>{leagueName} Clubs</h1>
			<div className="clubs-row">
				{clubs.map((club) => {
					const clubLink =
						teamLinks[
							club.name
								.normalize("NFD")
								.replace(/[\u0300-\u036f]/g, "")
								.toLowerCase()
								.replace(/[^a-z0-9\s]/g, "")
								.replace(/\s+/g, "-")
						];

					return (
						<a
							key={club.id}
							href={clubLink}
							target="_blank"
							rel="noopener noreferrer"
							className="club-item-link"
						>
							<div className="club-item">
								<img
									src={club.crest}
									alt={`${club.name} logo`}
									className="club-logo"
								/>
								<span>{club.name}</span>
							</div>
						</a>
					);
				})}
			</div>
		</div>
	);
}
