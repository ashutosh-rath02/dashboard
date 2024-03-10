import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: "https://us1-easy-javelin-41985.upstash.io",
  token: process.env.REDIS_KEY!,
});
