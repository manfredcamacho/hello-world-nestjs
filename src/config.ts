export default () => ({
    mongodb: {
      uri: process.env.MONGODB_URI,
    },
    redis: {
      uri: process.env.REDIS_URI,
    },
    newsApi: {
      key: process.env.NEWS_API_KEY,
    },
    cache: {
      ttl: Number(process.env.CACHE_TTL),
    },
  });
