import React from "react";
import Results from "../../../../../components/Results";
import { fetchResults } from "../../../../../utils/api/fetchResults"; 

const PremierLeagueResultsPage = async () => {
	const { results, error } = await fetchResults("PL");

	return (
		<>
			<Results results={results} error={error} leagueCode="PL" />
		</>
	);
};

export default PremierLeagueResultsPage;
