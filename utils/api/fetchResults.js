import axios from "axios";
import getRedisClient from "./redisClient";

const CACHE_EXPIRATION_TIME_RESULTS = 3600;

export async function fetchResults(
	leagueCode,
	revalidateTime = CACHE_EXPIRATION_TIME_RESULTS
) {
	let results = [];
	let error = null;

	const redisKey = `results-${leagueCode}`;

	try {
		const redisClient = await getRedisClient();

		const cachedData = await redisClient.get(redisKey);
		if (cachedData) {
			results = JSON.parse(cachedData);
		} else {
			const res = await axios.get(
				`https://api.football-data.org/v4/competitions/${leagueCode}/matches`,
				{
					headers: {
						"X-Auth-Token": process.env.NEXT_PUBLIC_FOOTBALL_API_KEY,
					},
					params: {
						status: "FINISHED",
					},
				}
			);
			results = res.data.matches || [];

			await redisClient.setEx(
				redisKey,
				revalidateTime,
				JSON.stringify(results)
			);
		}
	} catch (err) {
		error = err.message;
		console.error("Error fetching results data:", error);
	}

	return { results, error };
}
