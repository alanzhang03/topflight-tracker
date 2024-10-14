import React from "react";
import HomepageDisplay from "../../../../components/HomepageDisplay";
import ClubsDisplay from "../../../../components/ClubsDisplay";
import NewsDisplay from "../../../../components/NewsDisplay";
import { fetchClubs } from "../../../../utils/api/fetchClubs";
import { fetchNews } from "../../../../utils/api/fetchNews";

const PremierLeaguePage = async () => {
	const { clubs, error: clubsError } = await fetchClubs("PL");
	const { news, error: newsError } = await fetchNews("Premier League");

	const routeLinks = [
		{ name: "Standings", path: "/leagues/premier-league/standings" },
		{ name: "Fixtures", path: "/leagues/premier-league/fixtures" },
		{ name: "Results", path: "/leagues/premier-league/results" },
	];

	return (
		<>
			<HomepageDisplay
				leagueName="Premier League"
				logo="/images/premier-league.svg"
				description="Explore the latest standings, fixtures, results, and more from the Premier League."
				routeLinks={routeLinks}
			/>
			<ClubsDisplay clubs={clubs} error={clubsError} leagueCode="PL" />
			<NewsDisplay news={news} error={newsError} leagueName="Premier League" />
		</>
	);
};

export default PremierLeaguePage;
