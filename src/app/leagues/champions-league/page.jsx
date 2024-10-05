import React from "react";
import HomepageDisplay from "../../../../components/HomepageDisplay";
import ClubsDisplay from "../../../../components/ClubsDisplay";
import NewsDisplay from "../../../../components/NewsDisplay";

const page = () => {
	const routeLinks = [
		{ name: "Standings", path: "/leagues/champions-league/standings" },
		{ name: "Fixtures", path: "/leagues/champions-league/fixtures" },
		{ name: "Results", path: "/leagues/bundesliga/results" },
	];

	return (
		<>
			<HomepageDisplay
				leagueName="Champions League"
				logo="/images/champions-league.svg"
				description="Explore the latest standings, fixtures, results, and more from the Champions League."
				routeLinks={routeLinks}
			/>
			<ClubsDisplay leagueCode="CL" />
			<NewsDisplay leagueName="Champions League" />
		</>
	);
};

export default page;
