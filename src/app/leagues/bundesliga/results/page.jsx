import React from "react";
import Results from "../../../../../components/Results";
import { fetchResults } from "../../../../../utils/api/fetchResults";

export const dynamic = 'force-dynamic';

const BundesligaResultsPage = async () => {
	const { results, error } = await fetchResults("BL1");

	return (
		<>
			<Results results={results} error={error} leagueCode="BL1" />
		</>
	);
};

export default BundesligaResultsPage;
