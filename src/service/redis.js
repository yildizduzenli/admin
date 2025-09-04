import {Redis} from '@upstash/redis';

const redisUrl = 'https://super-antelope-27836.upstash.io';
const redisToken =
  'AWy8AAIncDE1NWU1M2FmMDRkODY0MTgxOGQ2NGY3ZjM5YTM4M2RmNnAxMjc4MzY';

if (!redisUrl || !redisToken) {
  console.error('Redis environment variables are not set:', {
    url: !!redisUrl,
    token: !!redisToken,
  });
}

const redis = new Redis({
  url: redisUrl || 'fallback-url',
  token: redisToken || 'fallback-token',
  // Telemetry'yi devre dışı bırak
  telemetry: false,
});

export const setRedis = async (key, value) => {
  try {
    if (!redisUrl || !redisToken) {
      console.error('Redis not configured properly');
      return null;
    }
    const response = await redis.set(key, JSON.stringify(value));
    return response;
  } catch (error) {
    console.error('Redis setRedis error:', error);
    return null;
  }
};

export const getRedis = async key => {
  try {
    if (!redisUrl || !redisToken) {
      console.error('Redis not configured properly');
      return null;
    }
    const response = await redis.get(key);
    return response;
  } catch (error) {
    console.error('Redis getRedis error:', error);
    return null;
  }
};

export const updateRedis = async (key, value, id) => {
  try {
    if (!redisUrl || !redisToken) {
      console.error('Redis not configured properly');
      return null;
    }
    const currentValue = await getRedis(key);
    if (!currentValue) return null;

    currentValue.splice(id, 1, value);
    const response = await redis.set(key, JSON.stringify(currentValue));
    return response;
  } catch (error) {
    console.error('Redis updateRedis error:', error);
    return null;
  }
};

export const deleteRedis = async (key, id) => {
  try {
    if (!redisUrl || !redisToken) {
      console.error('Redis not configured properly');
      return null;
    }
    const currentValue = await getRedis(key);
    if (!currentValue) return null;

    currentValue.splice(id, 1);
    const response = await redis.set(key, JSON.stringify(currentValue));
    return response;
  } catch (error) {
    console.error('Redis deleteRedis error:', error);
    return null;
  }
};
