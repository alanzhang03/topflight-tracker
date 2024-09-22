import Link from "next/link";

export default function BundesligaPage() {
	return (
		<div>
			<h1>Bundesliga Overview</h1>
			<p>
				Welcome to the Bundesliga section. Explore the standings, teams,
				lineups, and match history below:
			</p>
			<ul>
				<li>
					<Link href="/leagues/bundesliga/standings">Standings</Link>
				</li>
				<li>
					<Link href="/leagues/bundesliga/teams">Teams</Link>
				</li>
				<li>
					<Link href="/leagues/bundesliga/lineups">Lineups</Link>
				</li>
				<li>
					<Link href="/leagues/bundesliga/match-history">Match History</Link>
				</li>
			</ul>
		</div>
	);
}
