import { container } from 'tsyringe';

import ICacheFile from './models/ICacheFile';

import RedisCacheFile from './implementations/RedisCacheFile';

const files = {
  redis: RedisCacheFile,
};

container.registerSingleton<ICacheFile>('CacheFile', files.redis);
