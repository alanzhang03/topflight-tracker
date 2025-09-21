import axios from "axios";
import getRedisClient from "./redisClient";

const CACHE_EXPIRATION_TIME_NEWS = 80400;

export async function fetchNews(leagueName) {
  let news = [];
  let error = null;

  if (typeof window === "undefined") {
    const redisKey = `news-${leagueName}`;

    try {
      let cachedData = null;
      try {
        const redisClient = await getRedisClient();
        cachedData = await redisClient.get(redisKey);
      } catch (redisError) {
        console.warn(
          "Redis not available, fetching fresh data:",
          redisError.message
        );
      }

      if (cachedData) {
        news = JSON.parse(cachedData);
      } else {
        const options = {
          method: "GET",
          url: "https://v3-api.newscatcherapi.com/api/search",
          params: {
            q: `${leagueName} football Soccer -cricket -NFL -NBA -MLB `,
            lang: "en",
            sort_by: "relevancy",
            page: "1",
            page_size: 5,
          },
          headers: {
            "x-api-token": process.env.NEXT_PUBLIC_NEWSCATCHER_API_KEY,
          },
        };

        const response = await axios.request(options);
        let articles = response.data.articles || [];
        const uniqueArticles = articles.filter(
          (article, index, self) =>
            article.title &&
            article.link &&
            index === self.findIndex((t) => t.title === article.title)
        );

        news = uniqueArticles;

        try {
          const redisClient = await getRedisClient();
          await redisClient.setEx(
            redisKey,
            CACHE_EXPIRATION_TIME_NEWS,
            JSON.stringify(news)
          );
        } catch (cacheError) {
          console.warn("Could not cache news data:", cacheError.message);
        }
      }
    } catch (err) {
      error = err.message;
      console.error("Error fetching news data:", error);
    }
  }

  return { news, error };
}
