import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Provider from '../infra/typeorm/entities/Provider';
import IProvidersRepository from '../repositories/IProvidersRepository';

interface IRequestDTO {
  name: string;
  email_provider: string;
  email_jornalism?: string;
  email_opec?: string;
  city: string;
  state: string;
}

@injectable()
class CreateProviderService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    email_provider,
    email_jornalism,
    email_opec,
    city,
    state,
  }: IRequestDTO): Promise<Provider> {
    const checkProviderExists = await this.providersRepository.findByEmail(
      email_provider,
    );

    if (checkProviderExists) {
      throw new AppError('Email address already used.');
    }

    const provider = this.providersRepository.create({
      name,
      email_provider,
      email_jornalism,
      email_opec,
      city,
      state,
    });

    await this.cacheProvider.invalidate('providers-list');

    return provider;
  }
}

export default CreateProviderService;
