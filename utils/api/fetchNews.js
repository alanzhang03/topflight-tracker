import axios from "axios";
import getRedisClient from "./redisClient";

const CACHE_EXPIRATION_TIME_NEWS = 80400;

export async function fetchNews(leagueName) {
	let news = [];
	let error = null;

	if (typeof window === "undefined") {
		const redisKey = `news-${leagueName}`;

		try {
			const redisClient = await getRedisClient();

			const cachedData = await redisClient.get(redisKey);
			if (cachedData) {
				news = JSON.parse(cachedData);
			} else {
				const options = {
					method: "GET",
					url: "https://api.newscatcherapi.com/v2/search",
					params: {
						q: `${leagueName} football Soccer -cricket -NFL -NBA -MLB `,
						lang: "en",
						sort_by: "relevancy",
						page: "1",
						page_size: 5,
					},
					headers: {
						"x-api-key": process.env.NEXT_PUBLIC_NEWSCATCHER_API_KEY,
					},
				};

				const response = await axios.request(options);
				let articles = response.data.articles || [];
				const uniqueArticles = articles.filter(
					(article, index, self) =>
						index === self.findIndex((t) => t.topic === article.topic)
				);

				news = uniqueArticles;

				await redisClient.setEx(
					redisKey,
					CACHE_EXPIRATION_TIME_NEWS,
					JSON.stringify(news)
				);
			}
		} catch (err) {
			error = err.message;
			console.error("Error fetching news data:", error);
		}
	}

	return { news, error };
}
