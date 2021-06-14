import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IInformationsRepository from '../repositories/IInformationsRepository';

interface IRequestDTO {
  user_id: string;
  provider_id: string;
  information_id: string;
}

@injectable()
class UpdateSignalService {
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
  }: IRequestDTO): Promise<void> {
    const information = await this.informationsRepository.findById(
      information_id,
    );

    if (!information) {
      throw new AppError('Information does not exist.');
    }

    await this.informationsRepository.delete(information.id);

    await this.cacheProvider.invalidate(
      `providers-informations:${provider_id}`,
    );
  }
}

export default UpdateSignalService;
