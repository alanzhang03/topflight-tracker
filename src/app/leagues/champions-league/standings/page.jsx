import React from "react";
import StandingsTable from "../../../../../components/StandingsTable";

const page = () => {
	return (
		<>
			<h1>Champions League Page</h1>
			<StandingsTable leagueCode="CL" />;
		</>
	);
};

export default page;
