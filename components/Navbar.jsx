import React from "react";
import Link from "next/link";
import "./styles/Navbar.scss"; // Assuming you'll create this file in components/styles

export default function Navbar({ league }) {
	// Update the league URLs to match your directory structure
	const leagueUrls = {
		epl: {
			name: "Premier League",
			standings: "/leagues/premier-league/standings", // Corrected path
			clubs: "/leagues/premier-league/teams", // Assuming teams refers to clubs
			fixtures: "/leagues/premier-league/fixtures", // You need to create this route
		},
		bundesliga: {
			name: "Bundesliga",
			standings: "/leagues/bundesliga/standings", // Corrected path
			clubs: "/leagues/bundesliga/teams", // Assuming teams refers to clubs
			fixtures: "/leagues/bundesliga/fixtures", // You need to create this route
		},
		laliga: {
			name: "La Liga",
			standings: "/leagues/la-liga/standings", // Corrected path
			clubs: "/leagues/la-liga/teams", // Assuming teams refers to clubs
			fixtures: "/leagues/la-liga/fixtures", // You need to create this route
		},
	};

	const currentLeague = leagueUrls[league];

	if (!currentLeague) {
		return <div>League not found</div>;
	}

	return (
		<nav className="navbar">
			<div className="navbar-container">
				<ul className="navbar-menu">
					<li>
						<Link href={currentLeague.standings}>Standings</Link>
					</li>
					<li>
						<Link href={currentLeague.clubs}>Clubs</Link>
					</li>
					<li>
						<Link href={currentLeague.fixtures}>Fixtures</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}
