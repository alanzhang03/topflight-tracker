

import axios from "axios";
import "./styles/ClubsDisplay.scss";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import ScrollTrigger from "gsap/ScrollTrigger";

const leagueNames = {
	PL: "Premier League",
	BL1: "Bundesliga",
	SA: "Serie A",
	PD: "La Liga",
	FL1: "Ligue 1",
	CL: "Champions League",
};

export default async function ClubsDisplay({ leagueCode }) {
	let clubs = [];
	let error = null;

	try {
		const response = await axios.get(
			`https://api.football-data.org/v4/competitions/${leagueCode}/teams`,
			{
				headers: {
					"X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY,
				},
			}
		);
		clubs = response.data.teams || [];
	} catch (err) {
		error = err.message;
	}

	if (error) {
		return <p>Error loading clubs: {error}</p>;
	}

	if (clubs.length === 0) {
		return <p>No clubs data available.</p>;
	}

	const leagueName = leagueNames[leagueCode] || leagueCode;

	return (
		<div className="clubs-container">
			<h1>{leagueName} Clubs</h1>
			<div className="clubs-row">
				{clubs.map((club) => (
					<div key={club.id} className="club-item">
						<img
							src={club.crest}
							alt={`${club.name} logo`}
							className="club-logo"
						/>
						<span>{club.name}</span>
					</div>
				))}
			</div>
		</div>
	);
}
