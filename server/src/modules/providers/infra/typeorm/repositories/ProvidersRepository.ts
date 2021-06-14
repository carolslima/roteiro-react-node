import { getRepository, Repository } from 'typeorm';

import IProvidersRepository from '@modules/providers/repositories/IProvidersRepository';
import ICreateProviderDTO from '@modules/providers/dtos/ICreateProviderDTO';

import Provider from '../entities/Provider';

class ProvidersRepository implements IProvidersRepository {
  private ormRepository: Repository<Provider>;

  constructor() {
    this.ormRepository = getRepository(Provider);
  }

  public async create({
    name,
    email_provider,
    email_jornalism,
    email_opec,
    city,
    state,
  }: ICreateProviderDTO): Promise<Provider> {
    const provider = this.ormRepository.create({
      name,
      email_provider,
      email_jornalism,
      email_opec,
      city,
      state,
      status: true,
    });

    await this.ormRepository.save(provider);

    return provider;
  }

  public async update(data: Provider): Promise<Provider> {
    return this.ormRepository.save(data);
  }

  public async save(data: Provider): Promise<Provider> {
    return this.ormRepository.save(data);
  }

  public async findByEmail(email: string): Promise<Provider | undefined> {
    const findProvider = await this.ormRepository.findOne({
      where: { email_provider: email },
    });

    return findProvider;
  }

  public async findById(id: string): Promise<Provider | undefined> {
    const findProvider = await this.ormRepository.findOne({
      where: { id },
    });

    return findProvider;
  }

  public async findAllProviders(): Promise<Provider[]> {
    const findProviders = await this.ormRepository.find({
      order: {
        name: 'ASC',
      },
    });

    return findProviders;
  }
}

export default ProvidersRepository;
