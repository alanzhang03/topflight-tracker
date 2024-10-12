import React from "react";
import FixturesTable from "../../../../../components/FixturesTable";
import { fetchFixtures } from "../../../../../utils/api/fetchFixtures";

const LaLigaFixturesPage = async () => {
	const { fixtures, error } = await fetchFixtures("PD");

	return (
		<>
			<FixturesTable fixtures={fixtures} error={error} leagueCode="PD" />
		</>
	);
};

export default LaLigaFixturesPage;
