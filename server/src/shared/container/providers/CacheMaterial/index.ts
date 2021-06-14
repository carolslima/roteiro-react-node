import { container } from 'tsyringe';

import ICacheMaterial from './models/ICacheMaterial';

import RedisCacheMaterial from './implementations/RedisCacheMaterial';

const materials = {
  redis: RedisCacheMaterial,
};

container.registerSingleton<ICacheMaterial>('CacheMaterial', materials.redis);
