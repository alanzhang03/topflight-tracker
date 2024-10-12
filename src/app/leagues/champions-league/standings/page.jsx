import React from "react";
import StandingsTable from "../../../../../components/StandingsTable";
import { fetchStandings } from "../../../../../utils/api/fetchStandings.js";

const ChampionsLeagueStandingsPage = async () => {
	const { standings, error } = await fetchStandings("CL");

	return (
		<>
			<StandingsTable standings={standings} error={error} leagueCode="CL" />
		</>
	);
};

export default ChampionsLeagueStandingsPage;
