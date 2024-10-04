

import React from "react";
import HomepageDisplay from "../../../../components/HomepageDisplay";

const page = () => {
	const routeLinks = [
		{ name: "Standings", path: "/leagues/champions-league/standings" },
		{ name: "Clubs", path: "/leagues/champions-league/teams" },
		{ name: "Fixtures", path: "/leagues/champions-league/fixtures" },
	];

	return (
		<HomepageDisplay
			leagueName="Champions League"
			logo="/images/champions-league.svg"
			description="Explore the latest standings, fixtures, clubs, and more from the Champions League."
			routeLinks={routeLinks}
		/>
	);
};

export default page;
