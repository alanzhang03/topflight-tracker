import React from "react";
import Results from "../../../../../components/Results";
import { fetchResults } from "../../../../../utils/api/fetchResults";

const ChampionsLeagueResultsPage = async () => {
	const { results, error } = await fetchResults("CL");

	return (
		<>
			<Results results={results} error={error} leagueCode="CL" />
		</>
	);
};

export default ChampionsLeagueResultsPage;
