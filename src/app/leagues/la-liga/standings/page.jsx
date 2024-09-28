import React from "react";
import StandingsTable from "../../../../../components/StandingsTable";

const page = () => {
	return (
		<>
			<h1>La Liga</h1>
			<StandingsTable leagueCode="PD" />;
		</>
	);
};

export default page;
