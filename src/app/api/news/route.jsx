// src/app/api/news/route.js
import { NextResponse } from "next/server";
import axios from "axios";

export async function GET() {
	try {
		const response = await axios.get(
			`https://api.football-data.org/v4/competitions/PL/matches`,
			{
				headers: {
					"X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY,
				},
				params: {
					status: "FINISHED",
					limit: 5,
				},
			}
		);

		const newsData = response.data.matches.map((match) => ({
			title: `${match.homeTeam.name} vs ${match.awayTeam.name}`,
			date: new Date(match.utcDate).toLocaleDateString(),
			description: `Final score: ${match.score.fullTime.homeTeam} - ${match.score.fullTime.awayTeam}`,
			url: "#",
		}));

		return NextResponse.json(newsData);
	} catch (error) {
		console.error("Error fetching news data:", error);
		return NextResponse.json([], { status: 500 });
	}
}
