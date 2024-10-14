import React from "react";
import HomepageDisplay from "../../../../components/HomepageDisplay";
import ClubsDisplay from "../../../../components/ClubsDisplay";
import NewsDisplay from "../../../../components/NewsDisplay";
import { fetchClubs } from "../../../../utils/api/fetchClubs";
import { fetchNews } from "../../../../utils/api/fetchNews";

const LaLigaPage = async () => {
	const { clubs, error } = await fetchClubs("PD");
	const { news, error: newsError } = await fetchNews("La Liga");

	const routeLinks = [
		{ name: "Standings", path: "/leagues/la-liga/standings" },
		{ name: "Fixtures", path: "/leagues/la-liga/fixtures" },
		{ name: "Results", path: "/leagues/la-liga/results" },
	];

	return (
		<>
			<HomepageDisplay
				leagueName="La Liga"
				logo="/images/la-liga.svg"
				description="Explore the latest standings, fixtures, results, and more from La Liga."
				routeLinks={routeLinks}
			/>
			<ClubsDisplay clubs={clubs} error={error} leagueCode="PD" />
			<NewsDisplay news={news} error={newsError} leagueName="La Liga" />
		</>
	);
};

export default LaLigaPage;
