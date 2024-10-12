import React from "react";
import StandingsTable from "../../../../../components/StandingsTable";
import { fetchStandings } from "../../../../../utils/api/fetchStandings.js";

const LaLigaStandingsPage = async () => {
	const { standings, error } = await fetchStandings("PD");

	return (
		<>
			<StandingsTable standings={standings} error={error} leagueCode="PD" />
		</>
	);
};

export default LaLigaStandingsPage;
