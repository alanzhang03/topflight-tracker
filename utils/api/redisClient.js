import { createClient } from "redis";

let redisClient;

if (!global.redisClient) {
  global.redisClient = createClient({
    url: process.env.REDIS_URL,
  });
  global.redisClient.on("error", (err) => {
    console.error("Redis Client Error", err);
  });
  global.redisClient.connect().catch((err) => {
    console.error("Redis Connect Error", err);
  });
}

redisClient = global.redisClient;

const getRedisClient = async () => redisClient;

export default getRedisClient;
