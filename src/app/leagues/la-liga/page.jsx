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
			`https://api.football-data.org/v4/competitions/PD/teams`,
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

const LaLigaPage = async () => {
	const { clubs, error } = await fetchClubs();

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
			<NewsDisplay leagueName="La Liga" />
		</>
	);
};

export default LaLigaPage;
