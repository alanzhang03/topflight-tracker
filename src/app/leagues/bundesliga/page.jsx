import React from "react";
import HomepageDisplay from "../../../../components/HomepageDisplay";

const page = () => {
	const routeLinks = [
		{ name: "Standings", path: "/leagues/bundesliga/standings" },
		{ name: "Fixtures", path: "/leagues/bundesligafixtures" },
		{ name: "Results", path: "/leagues/bundesliga/results" },
	];

	return (
		<HomepageDisplay
			leagueName="Bundesliga"
			logo="/images/bundesliga.svg"
			description="Explore the latest standings, fixtures, results, and more from the Bundesliga."
			routeLinks={routeLinks}
		/>
	);
};

export default page;
