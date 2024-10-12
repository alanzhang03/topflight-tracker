import React from "react";
import Results from "../../../../../components/Results";
import { fetchResults } from "../../../../../utils/api/fetchResults";

const ChampionsLeagueResultsPage = async () => {
	const { results, error } = await fetchResults("PL");

	return (
		<>
			<Results results={results} error={error} leagueCode="PL" />
		</>
	);
};

export default ChampionsLeagueResultsPage;
