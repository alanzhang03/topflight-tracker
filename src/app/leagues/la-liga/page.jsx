import React from "react";
import HomepageDisplay from "../../../../components/HomepageDisplay";
import ClubsDisplay from "../../../../components/ClubsDisplay";
import NewsDisplay from "../../../../components/NewsDisplay";

const page = () => {
	const routeLinks = [
		{ name: "Standings", path: "/leagues/la-liga/standings" },
		{ name: "Fixtures", path: "/leagues/la-liga/fixtures" },
		{ name: "Results", path: "/leagues/bundesliga/results" },
	];

	return (
		<>
			<HomepageDisplay
				leagueName="La Liga"
				logo="/images/la-liga.svg"
				description="Explore the latest standings, fixtures, results, and more from La Liga."
				routeLinks={routeLinks}
			/>
			<ClubsDisplay leagueCode="PD" />
			<NewsDisplay leagueName="La Liga" />
		</>
	);
};

export default page;
