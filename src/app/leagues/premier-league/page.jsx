import HomepageDisplay from "../../../../components/HomepageDisplay";

const PremierLeaguePage = () => {
	const routeLinks = [
		{ name: "Standings", path: "/leagues/premier-league/standings" },
		{ name: "Fixtures", path: "/leagues/premier-league/fixtures" },
		{ name: "Results", path: "/leagues/bundesliga/results" },
	];

	return (
		<HomepageDisplay
			leagueName="Premier League"
			logo="/images/premier-league.svg"
			description="Explore the latest standings, fixtures, results, and more from the Premier League."
			routeLinks={routeLinks}
		/>
	);
};

export default PremierLeaguePage;
