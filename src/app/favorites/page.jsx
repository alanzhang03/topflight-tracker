// src/app/favorites/page.js
"use client";
import { useFavorites } from "@/app/context/FavoritesContext";
import Link from "next/link";
import "./favorites.scss";

const leagueNames = {
	PL: "Premier League",
	BL1: "Bundesliga",
	PD: "La Liga",
	CL: "Champions League",
};

const FavoritesPage = () => {
	const { favorites } = useFavorites();

	const favoritesByLeague = favorites.reduce((acc, club) => {
		const leagueCode = club.leagueCode || "Other";
		if (!acc[leagueCode]) acc[leagueCode] = [];
		acc[leagueCode].push(club);
		return acc;
	}, {});

	return (
		<div className="favorites-container">
			<h1>Your Favorite Clubs</h1>
			{Object.keys(favoritesByLeague).length === 0 ? (
				<p>
					Coming Soon!
				</p>
			) : (
				<div>
					{Object.entries(favoritesByLeague).map(([leagueCode, clubs]) => (
						<div key={leagueCode} className="league-group">
							<h2 className="league-title">
								{leagueNames[leagueCode] || leagueCode}
							</h2>
							<div className="clubs-grid">
								{clubs.map((club) => (
									<div key={club.id} className="favorite-club">
										<Link href={`/clubs/${club.id}`}>
											<img
												src={club.crest}
												alt={`${club.name} logo`}
												className="club-logo"
											/>
											<h3>{club.name}</h3>
										</Link>
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default FavoritesPage;
