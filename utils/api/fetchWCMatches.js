import axios from "axios";
import getRedisClient from "./redisClient";

const CACHE_TTL = 60;

export async function fetchWCMatches() {
  const redisKey = "matches-WC";

  try {
    const redisClient = await getRedisClient();
    const cached = await redisClient.get(redisKey);
    if (cached) return { matches: JSON.parse(cached), error: null };

    const res = await axios.get(
      "https://api.football-data.org/v4/competitions/WC/matches",
      { headers: { "X-Auth-Token": process.env.FOOTBALL_API_KEY } }
    );

    const matches = res.data.matches || [];
    await redisClient.setEx(redisKey, CACHE_TTL, JSON.stringify(matches));
    return { matches, error: null };
  } catch (err) {
    console.error("Error fetching WC matches:", err.message);
    return { matches: [], error: err.message };
  }
}
