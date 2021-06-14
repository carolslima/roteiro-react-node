import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Provider from '@modules/providers/infra/typeorm/entities/Provider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IProvidersRepository from '../repositories/IProvidersRepository';

interface IRequestDTO {
  provider_id: string;
  field: string;
  value: string | number | boolean;
}

@injectable()
class UpdateProviderService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    provider_id,
    field,
    value,
  }: IRequestDTO): Promise<Provider> {
    const provider = await this.providersRepository.findById(provider_id);

    if (!provider) {
      throw new AppError('Provider does not exist.');
    }

    if (field === 'email') {
      const checkProviderExists = await this.providersRepository.findByEmail(
        provider.email_provider,
      );

      if (checkProviderExists) {
        throw new AppError('Email address already used.');
      }
    }

    Object.assign(provider, {
      [field]: value === undefined || value === typeof NaN ? null : value,
    });

    await this.providersRepository.update(provider);

    await this.cacheProvider.invalidate('providers-list');

    return provider;
  }
}

export default UpdateProviderService;
