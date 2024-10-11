import React from "react";
import Results from "../../../../../components/Results";
import axios from "axios";

async function fetchResults() {
	let results = [];
	let error = null;

	try {
		const res = await axios.get(
			`https://api.football-data.org/v4/competitions/CL/matches`,
			{
				headers: {
					"X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY,
				},
				params: {
					status: "FINISHED",
				},
				next: { revalidate: 3600 }, 
			}
		);
		results = res.data.matches || [];
	} catch (err) {
		error = err.message;
	}

	return { results, error };
}

const ChampionsLeagueResultsPage = async () => {
	const { results, error } = await fetchResults();

	return (
		<>
			<Results results={results} error={error} leagueCode="CL" />
		</>
	);
};

export default ChampionsLeagueResultsPage;
