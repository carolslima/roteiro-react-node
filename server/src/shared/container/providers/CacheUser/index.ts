import { container } from 'tsyringe';

import ICacheUser from './models/ICacheUser';

import RedisCacheUser from './implementations/RedisCacheUser';

const users = {
  redis: RedisCacheUser,
};

container.registerSingleton<ICacheUser>('CacheUser', users.redis);
