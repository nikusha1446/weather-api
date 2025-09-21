import redis from 'redis';

let client = null;

export const initializeCache = async () => {
  try {
    const redisURL = process.env.REDIS_URL || 'redis://localhost:6379';

    client = redis.createClient({
      url: redisURL,
    });

    client.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    client.on('connect', () => {
      console.log('Connected to Redis');
    });

    await client.connect();
    return true;
  } catch (error) {
    console.error('Failed to initialize Redis cache', error.message);
    return false;
  }
};

export const getCache = async (key) => {
  if (!client || !client.isOpen) {
    return null;
  }

  try {
    const data = await client.get(key);

    if (data) {
      return JSON.parse(data);
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting from cache:', error.message);
    return null;
  }
};

export const setCache = async (key, data, expirationInSeconds = 43200) => {
  if (!client || !client.isOpen) {
    return false;
  }

  try {
    await client.setEx(key, expirationInSeconds, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error setting cache:', error.message);
    return false;
  }
};

export const generateCacheKey = (city) => {
  return `weather:${city.toLowerCase()}`;
};

export const closeCache = async () => {
  if (client && client.isOpen) {
    await client.quit();
  }
};
