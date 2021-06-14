import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IInformationsRepository from '../repositories/IInformationsRepository';
import Information from '../infra/typeorm/entities/Information';

interface IRequestDTO {
  user_id: string;
  provider_id: string;
  information_id: string;
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
    information_id,
  }: IRequestDTO): Promise<Information> {
    const information = await this.informationsRepository.findById(
      information_id,
    );

    if (!information) {
      throw new AppError('Information does not exist.');
    }

    if (information.user_id_from !== user_id) {
      throw new AppError('Unauthorized', 401);
    }

    Object.assign(information, { read: true });

    await this.informationsRepository.update(information);

    await this.cacheProvider.invalidate(
      `providers-informations:${provider_id}:${user_id}`,
    );

    return information;
  }
}

export default ListInformationsService;
