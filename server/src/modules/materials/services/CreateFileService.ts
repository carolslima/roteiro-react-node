import { injectable, inject } from 'tsyringe';
import { format } from 'date-fns';

import ICacheSignal from '@shared/container/providers/CacheSignal/models/ICacheSignal';
import ICacheMaterial from '@shared/container/providers/CacheMaterial/models/ICacheMaterial';
import ICacheFile from '@shared/container/providers/CacheFile/models/ICacheFile';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import File from '../infra/typeorm/entities/File';
import IFilesRepository from '../repositories/IFilesRepository';

interface IRequest {
  name: string;
  path: string;
  size: number;
  user_id_create: string;
  provider_id: string;
  schedule: Date;
}

@injectable()
class CreateFileService {
  constructor(
    @inject('FilesRepository')
    private filesRepository: IFilesRepository,

    @inject('CacheSignal')
    private cacheSignal: ICacheSignal,

    @inject('CacheMaterial')
    private cacheMaterial: ICacheMaterial,

    @inject('CacheFile')
    private cacheFile: ICacheFile,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({
    name,
    path,
    size,
    user_id_create,
    provider_id,
    schedule,
  }: IRequest): Promise<File> {
    const file = await this.filesRepository.create({
      name,
      path,
      size,
      user_id_create,
      provider_id,
      schedule,
    });

    await this.storageProvider.saveFile(path);

    await this.cacheSignal.invalidate(`signals-list`);

    await this.cacheMaterial.invalidate(
      `provider-materials:${provider_id}:${format(schedule, 'yyyy-M')}`,
    );

    await this.cacheMaterial.invalidate(
      `provider-checklist:${provider_id}:${format(schedule, 'yyyy-M-d')}`,
    );

    await this.cacheMaterial.invalidate(
      `provider-paralelas:${provider_id}:${format(schedule, 'yyyy-M-d')}`,
    );

    await this.cacheFile.invalidate(`provider-files:${provider_id}`);

    await this.cacheFile.invalidate(
      `provider-files:${provider_id}:${format(schedule, 'yyyy-M-d')}`,
    );

    return file;
  }
}

export default CreateFileService;
