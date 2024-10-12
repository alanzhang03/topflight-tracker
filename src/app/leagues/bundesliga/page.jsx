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
			`https://api.football-data.org/v4/competitions/BL1/teams`,
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

const BundesligaPage = async () => {
	const { clubs, error } = await fetchClubs();

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
			<ClubsDisplay clubs={clubs} error={error} leagueCode="BL1" />
			<NewsDisplay leagueName="Bundesliga" />
		</>
	);
};

export default BundesligaPage;
