import React from "react";
import HomepageDisplay from "../../../../components/HomepageDisplay";
import ClubsDisplay from "../../../../components/ClubsDisplay";
import NewsDisplay from "../../../../components/NewsDisplay";
import axios from "axios";


async function fetchClubs() {
	let clubs = [];
	let error = null;

	try {
		const res = await axios.get(
			`https://api.football-data.org/v4/competitions/CL/teams`,
			{
				headers: {
					"X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY,
				},
				next: { revalidate: 2592000 }, 
			}
		);
		clubs = res.data.teams || [];
	} catch (err) {
		error = err.message;
	}

	return { clubs, error };
}

const ChampionsLeaguePage = async () => {
	const { clubs, error } = await fetchClubs();

	const routeLinks = [
		{ name: "Standings", path: "/leagues/champions-league/standings" },
		{ name: "Fixtures", path: "/leagues/champions-league/fixtures" },
		{ name: "Results", path: "/leagues/champions-league/results" },
	];

	return (
		<>
			<HomepageDisplay
				leagueName="Champions League"
				logo="/images/champions-league.svg"
				description="Explore the latest standings, fixtures, results, and more from the Champions League."
				routeLinks={routeLinks}
			/>
			<ClubsDisplay clubs={clubs} error={error} leagueCode="CL" />
			<NewsDisplay leagueName="Champions League" />
		</>
	);
};

export default ChampionsLeaguePage;
