"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "./styles/Navbar.scss";

export default function Navbar({ league }) {
	const leagueUrls = {
		bundesliga: {
			name: "Bundesliga",
			standings: "/leagues/bundesliga/standings",
			fixtures: "/leagues/bundesliga/fixtures",
			results: "/leagues/bundesliga/results",
		},
		epl: {
			name: "Premier League",
			standings: "/leagues/premier-league/standings",
			fixtures: "/leagues/premier-league/fixtures",
			results: "/leagues/premier-league/results",
		},
		championsleague: {
			name: "Champions League",
			standings: "/leagues/champions-league/standings",
			fixtures: "/leagues/champions-league/fixtures",
			results: "/leagues/champions-league/results",
		},
		laliga: {
			name: "La Liga",
			standings: "/leagues/la-liga/standings",
			fixtures: "/leagues/la-liga/fixtures",
			results: "/leagues/la-liga/results",
		},
	};

	const currentLeague = leagueUrls[league];
	const pathname = usePathname();

	if (!currentLeague) {
		return <div>League not found</div>;
	}

	return (
		<nav className="navbar-prop">
			<div className="navbar-container-prop">
				<ul className="navbar-menu-prop">
					<li className={pathname === currentLeague.standings ? "active" : ""}>
						<Link href={currentLeague.standings}>Standings</Link>
					</li>
					<li className={pathname === currentLeague.fixtures ? "active" : ""}>
						<Link href={currentLeague.fixtures}>Fixtures</Link>
					</li>
					<li className={pathname === currentLeague.results ? "active" : ""}>
						<Link href={currentLeague.results}>Results</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}
