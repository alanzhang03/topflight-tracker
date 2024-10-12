import React from "react";
import StandingsTable from "../../../../../components/StandingsTable";
import { fetchStandings } from "../../../../../utils/api/fetchStandings.js";

const BundesligaStandingsPage = async () => {
	const { standings, error } = await fetchStandings("PL");

	return (
		<>
			<StandingsTable standings={standings} error={error} leagueCode="PL" />
		</>
	);
};

export default BundesligaStandingsPage;
