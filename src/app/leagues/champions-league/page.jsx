import React from "react";
import HomepageDisplay from "../../../../components/HomepageDisplay";
import ClubsDisplay from "../../../../components/ClubsDisplay";
import NewsDisplay from "../../../../components/NewsDisplay";
import { fetchClubs } from "../../../../utils/api/fetchClubs"; 

const ChampionsLeaguePage = async () => {
	const { clubs, error } = await fetchClubs("CL");

	const routeLinks = [
		{ name: "Standings", path: "/leagues/champions-league/standings" },
		{ name: "Fixtures", path: "/leagues/champions-league/fixtures" },
		{ name: "Results", path: "/leagues/champions-league/results" },
	];

	return (
		<>
			<HomepageDisplay
				leagueName="Champions League"
				logo="/images/champions-league.svg"
				description="Explore the latest standings, fixtures, results, and more from the Champions League."
				routeLinks={routeLinks}
			/>
			<ClubsDisplay clubs={clubs} error={error} leagueCode="CL" />
			<NewsDisplay leagueName="Champions League" />
		</>
	);
};

export default ChampionsLeaguePage;
