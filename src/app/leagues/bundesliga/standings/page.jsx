import React from "react";
import StandingsTable from "../../../../../components/StandingsTable";
import { fetchStandings } from "../../../../../utils/api/fetchStandings.js";

const BundesligaStandingsPage = async () => {
	const { standings, error } = await fetchStandings("BL1");

	return (
		<>
			<StandingsTable standings={standings} error={error} leagueCode="BL1" />
		</>
	);
};

export default BundesligaStandingsPage;
