import axios from "axios";
import getRedisClient from "./redisClient";

const CACHE_EXPIRATION_TIME_FIXTURES = 604800;

export async function fetchFixtures(
	leagueCode,
	revalidateTime = CACHE_EXPIRATION_TIME_FIXTURES
) {
	let fixtures = [];
	let error = null;

	const redisKey = `fixtures-${leagueCode}`;
	try {
		const redisClient = await getRedisClient();
		const cachedData = await redisClient.get(redisKey);
		if (cachedData) {
			fixtures = JSON.parse(cachedData);
		} else {
			const res = await axios.get(
				`https://api.football-data.org/v4/competitions/${leagueCode}/matches`,
				{
					headers: {
						"X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY,
					},
					params: {
						status: "SCHEDULED",
					},
				}
			);
			fixtures = res.data.matches || [];

			await redisClient.setEx(
				redisKey,
				revalidateTime,
				JSON.stringify(fixtures)
			);
		}
	} catch (err) {
		error = err.message;
		console.error("Error fetching fixtures data:", error);
	}

	return { fixtures, error };
}
