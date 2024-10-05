import React from "react";
import HomepageDisplay from "../../../../components/HomepageDisplay";
import ClubsDisplay from "../../../../components/ClubsDisplay";
import NewsDisplay from "../../../../components/NewsDisplay";

const page = () => {
	const routeLinks = [
		{ name: "Standings", path: "/leagues/bundesliga/standings" },
		{ name: "Fixtures", path: "/leagues/bundesligafixtures" },
		{ name: "Results", path: "/leagues/bundesliga/results" },
	];

	return (
		<>
			<HomepageDisplay
				leagueName="Bundesliga"
				logo="/images/bundesliga.svg"
				description="Explore the latest standings, fixtures, results, and more from the Bundesliga."
				routeLinks={routeLinks}
				leagueCode="BL1"
			/>
			<ClubsDisplay leagueCode="BL1" />
			<NewsDisplay leagueName="Bundesliga" />
		</>
	);
};

export default page;
