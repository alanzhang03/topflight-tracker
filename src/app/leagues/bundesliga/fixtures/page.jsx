import React from "react";
import FixturesTable from "../../../../../components/FixturesTable";
import { fetchFixtures } from "../../../../../utils/api/fetchFixtures";

const BundesligaFixturesPage = async () => {
	const { fixtures, error } = await fetchFixtures("BL1");

	return (
		<>
			<FixturesTable fixtures={fixtures} error={error} leagueCode="BL1" />
		</>
	);
};

export default BundesligaFixturesPage;
