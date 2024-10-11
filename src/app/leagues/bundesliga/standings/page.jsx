import React from "react";
import StandingsTable from "../../../../../components/StandingsTable";
import axios from "axios";


async function fetchStandings() {
	let standings = [];
	let error = null;

	try {
		const res = await axios.get(
			`https://api.football-data.org/v4/competitions/BL1/standings`,
			{
				headers: {
					"X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY,
				},
				next: { revalidate: 3600 }, 
			}
		);
		standings = res.data.standings?.[0]?.table || [];
	} catch (err) {
		error = err.message;
	}

	return { standings, error };
}

const BundesligaStandingsPage = async () => {
	const { standings, error } = await fetchStandings();

	return (
		<>
			<StandingsTable standings={standings} error={error} leagueCode="BL1" />
		</>
	);
};

export default BundesligaStandingsPage;
