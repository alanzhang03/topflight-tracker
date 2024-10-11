import FixturesTable from "../../../../../components/FixturesTable";

async function fetchFixtures() {
	const res = await fetch(
		`https://api.football-data.org/v4/competitions/PL/matches`,
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

const PremierLeagueFixturesPage = async () => {
	const { fixtures, error } = await fetchFixtures();

	return (
		<>
			<FixturesTable fixtures={fixtures} error={error} leagueCode="PL" />
		</>
	);
};

export default PremierLeagueFixturesPage;
