import { RedisOptions } from 'ioredis';

interface ICacheConfig {
  driver: 'redis';

  config: {
    redis: RedisOptions;
  };
}

export default {
  driver: 'redis',

  config: {
    redis: {
      host: process.env.DB_REDIS_HOST,
      port: process.env.DB_REDIS_PORT,
      password: process.env.DB_REDIS_PASSWORD || undefined,
    },
  },
} as ICacheConfig;
