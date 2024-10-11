import FixturesTable from "../../../../../components/FixturesTable";

async function fetchFixtures() {
	const res = await fetch(
		`https://api.football-data.org/v4/competitions/PD/matches`,
		{
			headers: {
				"X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY,
			},
			next: { revalidate: 604800 },
		}
	);
	const data = await res.json();
	return {
		fixtures: data.matches || [],
		error: res.ok ? null : "Error fetching data",
	};
}

const LaLigaFixturesPage = async () => {
	const { fixtures, error } = await fetchFixtures();

	return (
		<>
			<FixturesTable fixtures={fixtures} error={error} leagueCode="PD" />
		</>
	);
};

export default LaLigaFixturesPage;
