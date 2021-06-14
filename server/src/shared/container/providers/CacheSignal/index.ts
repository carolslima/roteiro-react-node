import { container } from 'tsyringe';

import ICacheSignal from './models/ICacheSignal';

import RedisCacheSignal from './implementations/RedisCacheSignal';

const providers = {
  redis: RedisCacheSignal,
};

container.registerSingleton<ICacheSignal>('CacheSignal', providers.redis);
