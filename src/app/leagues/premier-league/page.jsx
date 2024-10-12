import React from "react";
import HomepageDisplay from "../../../../components/HomepageDisplay";
import ClubsDisplay from "../../../../components/ClubsDisplay";
import NewsDisplay from "../../../../components/NewsDisplay";
import { fetchClubs } from "../../../../utils/api/fetchClubs"; 

const PremierLeaguePage = async () => {
	const { clubs, error } = await fetchClubs("PL");

	const routeLinks = [
		{ name: "Standings", path: "/leagues/premier-league/standings" },
		{ name: "Fixtures", path: "/leagues/premier-league/fixtures" },
		{ name: "Results", path: "/leagues/premier-league/results" },
	];

	return (
		<>
			<HomepageDisplay
				leagueName="Premier League"
				logo="/images/premier-league.svg"
				description="Explore the latest standings, fixtures, results, and more from the Premier League."
				routeLinks={routeLinks}
			/>
			<ClubsDisplay clubs={clubs} error={error} leagueCode="PL" />
			<NewsDisplay leagueName="Premier League" />
		</>
	);
};

export default PremierLeaguePage;
