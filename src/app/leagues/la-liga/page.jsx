import React from "react";
import HomepageDisplay from "../../../../components/HomepageDisplay";

const page = () => {
	const routeLinks = [
		{ name: "Standings", path: "/leagues/la-liga/standings" },
		{ name: "Fixtures", path: "/leagues/la-liga/fixtures" },
		{ name: "Results", path: "/leagues/bundesliga/results" },
	];

	return (
		<HomepageDisplay
			leagueName="La Liga"
			logo="/images/la-liga.svg"
			description="Explore the latest standings, fixtures, results, and more from La Liga."
			routeLinks={routeLinks}
		/>
	);
};

export default page;
