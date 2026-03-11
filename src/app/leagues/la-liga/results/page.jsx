import React from "react";
import Results from "../../../../../components/Results";
import { fetchResults } from "../../../../../utils/api/fetchResults";

export const dynamic = 'force-dynamic';

const LaLigaResultsPage = async () => {
	const { results, error } = await fetchResults("PD");

	return (
		<>
			<Results results={results} error={error} leagueCode="PD" />
		</>
	);
};

export default LaLigaResultsPage;
