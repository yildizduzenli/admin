import { Redis } from "@upstash/redis/cloudflare";

const redisUrl = import.meta.env.VITE_UPSTASH_REDIS_REST_URL;
const redisToken = import.meta.env.VITE_UPSTASH_REDIS_REST_TOKEN;

const redis = new Redis({
  url: redisUrl,
  token: redisToken,
  enableTelemetry: false,
});

export const setRedis = async (key, value) => {
  try {
    const response = await redis.set(key, JSON.stringify(value));
    return response;
  } catch (error) {
    console.error("Redis setRedis error:", error);
    return null;
  }
};

export const getRedis = async (key) => {
  try {
    const response = await redis.get(key);
    return response;
  } catch (error) {
    console.error("Redis getRedis error:", error);
    return null;
  }
};

export const updateRedis = async (key, value, id) => {
  try {
    const currentValue = await getRedis(key);
    if (!currentValue) return null;

    currentValue.splice(id, 1, value);
    const response = await redis.set(key, JSON.stringify(currentValue));
    return response;
  } catch (error) {
    console.error("Redis updateRedis error:", error);
    return null;
  }
};

export const deleteRedis = async (key, id) => {
  try {
    const currentValue = await getRedis(key);
    if (!currentValue) return null;

    currentValue.splice(id, 1);
    const response = await redis.set(key, JSON.stringify(currentValue));
    return response;
  } catch (error) {
    console.error("Redis deleteRedis error:", error);
    return null;
  }
};
