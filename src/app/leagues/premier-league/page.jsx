import HomepageDisplay from "../../../../components/HomepageDisplay";

const PremierLeaguePage = () => {
	const routeLinks = [
		{ name: "Standings", path: "/leagues/premier-league/standings" },
		{ name: "Clubs", path: "/leagues/premier-league/teams" },
		{ name: "Fixtures", path: "/leagues/premier-league/fixtures" },
	];

	return (
		<HomepageDisplay
			leagueName="Premier League"
			logo="/images/premier-league.svg"
			description="Explore the latest standings, fixtures, clubs, and more from the Premier League."
			routeLinks={routeLinks}
		/>
	);
};

export default PremierLeaguePage;
