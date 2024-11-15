import React from "react";
import FixturesTable from "../../../../../components/FixturesTable";
import { fetchFixtures } from "../../../../../utils/api/fetchFixtures";

const PremierLeagueFixturesPage = async () => {
	const { fixtures, error } = await fetchFixtures("PL");

	return (
		<>
			<FixturesTable fixtures={fixtures} error={error} leagueCode="PL" />
		</>
	);
};

export default PremierLeagueFixturesPage;
