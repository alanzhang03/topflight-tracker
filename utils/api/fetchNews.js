import axios from "axios";
import getRedisClient from "./redisClient";

const CACHE_EXPIRATION_TIME_NEWS = 80400;

export async function fetchNews(leagueName) {
  let news = [];
  let error = null;

  if (typeof window === "undefined") {
    // Add cache version to force refresh after changes
    const redisKey = `news-${leagueName}-v2`;

    try {
      const redisClient = await getRedisClient();

      const cachedData = await redisClient.get(redisKey);
      if (cachedData) {
        news = JSON.parse(cachedData);
        console.log(
          `Using cached news for ${leagueName}:`,
          news.length,
          "articles"
        );
      } else {
        console.log(`Fetching fresh news for ${leagueName}...`);
        const options = {
          method: "GET",
          url: "https://v3-api.newscatcherapi.com/api/search",
          params: {
            q: `${leagueName} football`,
            lang: "en",
            sort_by: "relevancy",
            page: "1",
            page_size: "6",
          },
          headers: {
            "x-api-token": process.env.NEXT_PUBLIC_NEWSCATCHER_API_KEY,
          },
        };

        console.log(
          "API Key:",
          process.env.NEXT_PUBLIC_NEWSCATCHER_API_KEY ? "Present" : "Missing"
        );
        console.log("Request URL:", options.url);
        console.log("Request params:", options.params);

        const response = await axios.request(options);
        console.log("API Response status:", response.status);
        console.log("API Response data keys:", Object.keys(response.data));
        console.log(
          "Total results available:",
          response.data.total_hits || "Unknown"
        );

        let articles = response.data.articles || [];
        console.log("Raw articles:", articles.length);

        // Show all articles without filtering to debug
        news = articles;
        console.log("All articles (no filtering):", news.length);
        console.log(
          "Sample article titles:",
          news.slice(0, 3).map((a) => a.title)
        );
        console.log(
          "Sample article summaries:",
          news.slice(0, 3).map((a) => a.summary?.substring(0, 100))
        );

        if (news.length > 0) {
          await redisClient.setEx(
            redisKey,
            CACHE_EXPIRATION_TIME_NEWS,
            JSON.stringify(news)
          );
          console.log(`Cached ${news.length} articles for ${leagueName}`);
        }
      }
    } catch (err) {
      error = err.message;
      console.error("Error fetching news data:", error);
      console.error("Full error object:", err);

      // Check if it's an API error
      if (err.response) {
        console.error("API Error Status:", err.response.status);
        console.error("API Error Data:", err.response.data);
      }
    }
  }

  return { news, error };
}
