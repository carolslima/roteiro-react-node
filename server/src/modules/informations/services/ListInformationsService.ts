import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IInformationsRepository from '../repositories/IInformationsRepository';
import Information from '../infra/typeorm/entities/Information';

interface IRequestDTO {
  user_id: string;
  provider_id: string;
}

@injectable()
class ListInformationsService {
  constructor(
    @inject('InformationsRepository')
    private informationsRepository: IInformationsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    user_id,
    provider_id,
  }: IRequestDTO): Promise<Information[]> {
    // await this.cacheProvider.invalidatePrefix(`providers-informations`);

    let informations = await this.cacheProvider.recover<Information[]>(
      `providers-informations:${provider_id}:${user_id}`,
    );

    if (!informations) {
      informations = await this.informationsRepository.findAllInformations(
        provider_id,
        user_id,
      );

      await this.cacheProvider.save(
        `providers-informations:${provider_id}:${user_id}`,
        informations,
      );
    }

    return informations;
  }
}

export default ListInformationsService;
