import React from "react";
import HomepageDisplay from "../../../../components/HomepageDisplay";

const page = () => {
	const routeLinks = [
		{ name: "Standings", path: "/leagues/bundesliga/standings" },
		{ name: "Clubs", path: "/leagues/bundesliga/teams" },
		{ name: "Fixtures", path: "/leagues/bundesligafixtures" },
	];

	return (
		<HomepageDisplay
			leagueName="Bundesliga"
			logo="/images/bundesliga.svg"
			description="Explore the latest standings, fixtures, clubs, and more from the Bundesliga."
			routeLinks={routeLinks}
		/>
	);
};

export default page;
