import React from "react";
import HomepageDisplay from "../../../../components/HomepageDisplay";
import ClubsDisplay from "../../../../components/ClubsDisplay";
import NewsDisplay from "../../../../components/NewsDisplay";
import { fetchClubs } from "../../../../utils/api/fetchClubs";
import { fetchNews } from "../../../../utils/api/fetchNews";

const BundesligaPage = async () => {
	const { clubs, error } = await fetchClubs("BL1");
	const { news, error: newsError } = await fetchNews("Bundesliga");

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
			/>
			<ClubsDisplay clubs={clubs} error={error} leagueCode="BL1" />
			<NewsDisplay news={news} error={newsError} leagueName="Bundesliga" />
		</>
	);
};

export default BundesligaPage;
