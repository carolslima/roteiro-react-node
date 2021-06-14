import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IProvidersRepository from '@modules/providers/repositories/IProvidersRepository';

import Provider from '@modules/providers/infra/typeorm/entities/Provider';

@injectable()
class ListProvidersService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Provider[]> {
    await this.cacheProvider.invalidate('providers-list');

    let providers = await this.cacheProvider.recover<Provider[]>(
      `providers-list`,
    );

    if (!providers) {
      providers = await this.providersRepository.findAllProviders();

      await this.cacheProvider.save(`providers-list`, providers);
    }

    return providers;
  }
}

export default ListProvidersService;
