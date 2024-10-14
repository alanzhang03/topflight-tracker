import React from "react";
import HomepageDisplay from "../../../../components/HomepageDisplay";
import ClubsDisplay from "../../../../components/ClubsDisplay";
import NewsDisplay from "../../../../components/NewsDisplay";
import { fetchClubs } from "../../../../utils/api/fetchClubs";
import { fetchNews } from "../../../../utils/api/fetchNews";

const teamLinks = {
	"arsenal-fc": "https://www.arsenal.com",
	"aston-villa-fc": "https://www.avfc.co.uk",
	"afc-bournemouth": "https://www.afcb.co.uk",
	"brentford-fc": "https://www.brentfordfc.com",
	"brighton-&-hove-albion-fc": "https://www.brightonandhovealbion.com",
	"chelsea-fc": "https://www.chelseafc.com",
	"crystal-palace-fc": "https://www.cpfc.co.uk",
	"everton-fc": "https://www.evertonfc.com",
	"fulham-fc": "https://www.fulhamfc.com",
	"liverpool-fc": "https://www.liverpoolfc.com",
	"luton-town-fc": "https://www.lutontown.co.uk",
	"manchester-city-fc": "https://www.mancity.com",
	"manchester-united-fc": "https://www.manutd.com",
	"newcastle-united-fc": "https://www.nufc.co.uk",
	"nottingham-forest-fc": "https://www.nottinghamforest.co.uk",
	"sheffield-united-fc": "https://www.sufc.co.uk",
	"tottenham-hotspur-fc": "https://www.tottenhamhotspur.com",
	"west-ham-united-fc": "https://www.whufc.com",
	"wolverhampton-wanderers-fc": "https://www.wolves.co.uk",
	"ipswich-town-fc": "https://www.itfc.co.uk",
	"southampton-fc": "https://www.southamptonfc.com",
	"leicester-city-fc": "https://www.lcfc.com",
};

const PremierLeaguePage = async () => {
	const { clubs, error } = await fetchClubs("PL");
	const { news, error: newsError } = await fetchNews("Premier League");

	const routeLinks = [
		{ name: "Standings", path: "/leagues/premier-league/standings" },
		{ name: "Fixtures", path: "/leagues/premier-league/fixtures" },
		{ name: "Results", path: "/leagues/premier-league/results" },
	];

	return (
		<>
			<HomepageDisplay
				leagueName="Premier League"
				logo="/images/premier-league.svg"
				description="Explore the latest standings, fixtures, results, and more from the Premier League."
				routeLinks={routeLinks}
			/>
			<ClubsDisplay
				clubs={clubs}
				error={error}
				leagueCode="PL"
				teamLinks={teamLinks}
			/>
			<NewsDisplay news={news} error={newsError} leagueName="Premier League" />
		</>
	);
};

export default PremierLeaguePage;
