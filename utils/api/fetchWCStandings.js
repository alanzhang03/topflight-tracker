import axios from "axios";
import getRedisClient from "./redisClient";

const CACHE_TTL = 120;

export async function fetchWCStandings() {
  const redisKey = "standings-WC";

  try {
    const redisClient = await getRedisClient();
    const cached = await redisClient.get(redisKey);
    if (cached) return { groups: JSON.parse(cached), error: null };

    const res = await axios.get(
      "https://api.football-data.org/v4/competitions/WC/standings",
      { headers: { "X-Auth-Token": process.env.FOOTBALL_API_KEY } }
    );

    const groups = res.data.standings || [];
    await redisClient.setEx(redisKey, CACHE_TTL, JSON.stringify(groups));
    return { groups, error: null };
  } catch (err) {
    console.error("Error fetching WC standings:", err.message);
    return { groups: [], error: err.message };
  }
}
