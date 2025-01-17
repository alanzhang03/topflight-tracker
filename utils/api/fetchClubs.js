import axios from "axios";
import getRedisClient from "./redisClient";

const CACHE_EXPIRATION_TIME_CLUBS = 7777000;

export async function fetchClubs(leagueCode) {
	let clubs = [];
	let error = null;

	const redisKey = `clubs-${leagueCode}`;

	try {
		const redisClient = await getRedisClient();

		const cachedData = await redisClient.get(redisKey);
		if (cachedData) {
			clubs = JSON.parse(cachedData);
		} else {
			const res = await axios.get(
				`https://api.football-data.org/v4/competitions/${leagueCode}/teams`,
				{
					headers: {
						"X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY,
					},
				}
			);
			clubs = res.data.teams || [];

			await redisClient.setEx(
				redisKey,
				CACHE_EXPIRATION_TIME_CLUBS,
				JSON.stringify(clubs)
			);
		}
	} catch (err) {
		error = err.message;
		console.error("Error fetching clubs data:", error);
	}

	return { clubs, error};
}
