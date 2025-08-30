import {Redis} from '@upstash/redis';

const redis = new Redis({
  url: import.meta.env.VITE_UPSTASH_REDIS_REST_URL,
  token: import.meta.env.VITE_UPSTASH_REDIS_REST_TOKEN,
});

export const setRedis = async (key, value) => {
  const response = await redis.set(key, JSON.stringify(value));
  return response;
};

export const getRedis = async key => {
  const response = await redis.get(key);

  return response;
};

export const updateRedis = async (key, value, id) => {
  const currentValue = await getRedis(key);
  currentValue.splice(id, 1, value);
  const response = await redis.set(key, JSON.stringify(currentValue));
  return response;
};

export const deleteRedis = async (key, id) => {
  const currentValue = await getRedis(key);
  currentValue.splice(id, 1);
  const response = await redis.set(key, JSON.stringify(currentValue));
  return response;
};
