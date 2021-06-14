import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import Provider from '@modules/providers/infra/typeorm/entities/Provider';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IProvidersRepository from '../repositories/IProvidersRepository';

interface IRequestDTO {
  provider_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('ProvidersRepository')
    private providersRepository: IProvidersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute({
    provider_id,
    avatarFilename,
  }: IRequestDTO): Promise<Provider> {
    const provider = await this.providersRepository.findById(provider_id);

    if (!provider) {
      throw new AppError('Only autenticated users can change avatar.', 401);
    }

    if (provider.avatar) {
      await this.storageProvider.deleteFile(provider.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    Object.assign(provider, { avatar: filename });

    await this.providersRepository.save(provider);

    await this.cacheProvider.invalidate('providers-list');

    return provider;
  }
}

export default UpdateUserAvatarService;
