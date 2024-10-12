import React from "react";
import FixturesTable from "../../../../../components/FixturesTable";
import { fetchFixtures } from "../../../../../utils/api/fetchFixtures";

const ChampionsLeagueFixturesPage = async () => {
	const { fixtures, error } = await fetchFixtures("CL");

	return (
		<>
			<FixturesTable fixtures={fixtures} error={error} leagueCode="CL" />
		</>
	);
};

export default ChampionsLeagueFixturesPage;
