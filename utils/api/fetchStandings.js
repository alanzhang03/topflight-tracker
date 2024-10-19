import axios from "axios";
import getRedisClient from "./redisClient";

const CACHE_EXPIRATION_TIME_STANDINGS = 5400;

export async function fetchStandings(
	leagueCode,
	revalidateTime = CACHE_EXPIRATION_TIME_STANDINGS
) {
	let standings = [];
	let error = null;

	const redisKey = `standings-${leagueCode}`;

	try {
		const redisClient = await getRedisClient();

		const cachedData = await redisClient.get(redisKey);
		if (cachedData) {
			standings = JSON.parse(cachedData);
		} else {
			const res = await axios.get(
				`https://api.football-data.org/v4/competitions/${leagueCode}/standings`,
				{
					headers: {
						"X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY,
					},
				}
			);
			standings = res.data.standings?.[0]?.table || [];

			await redisClient.setEx(
				redisKey,
				revalidateTime,
				JSON.stringify(standings)
			);
		}
	} catch (err) {
		error = err.message;
		console.error("Error fetching standings data:", error);
	}

	return { standings, error };
}
