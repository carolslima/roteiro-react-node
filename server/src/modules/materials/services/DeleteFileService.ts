import { injectable, inject } from 'tsyringe';
import { format } from 'date-fns';

import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ICacheMaterial from '@shared/container/providers/CacheMaterial/models/ICacheMaterial';
import ICacheFile from '@shared/container/providers/CacheFile/models/ICacheFile';
import IFilesRepository from '../repositories/IFilesRepository';
import IMaterialsRepository from '../repositories/IMaterialsRepository';

interface IRequest {
  file_id: string;
  provider_id: string;
}
@injectable()
class DeleteFileService {
  constructor(
    @inject('FilesRepository')
    private filesRepository: IFilesRepository,

    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('CacheMaterial')
    private cacheMaterial: ICacheMaterial,

    @inject('CacheMaterial')
    private cacheFile: ICacheFile,
  ) {}

  public async execute({ file_id, provider_id }: IRequest): Promise<void> {
    const file = await this.filesRepository.findById(file_id);
    const materials = await this.materialsRepository.findByFileId(file_id);

    if (!file) {
      throw new AppError('File does not exists');
    }

    if (file.provider_id !== provider_id) {
      throw new AppError('Unauthorized', 401);
    }

    if (materials) {
      await this.materialsRepository.deleteAllMaterialsWithFileId(materials);
    }

    await this.filesRepository.delete(file.id);

    await this.storageProvider.deleteFile(file.path);

    await this.cacheMaterial.invalidate(
      `provider-materials:${provider_id}:${format(file.schedule, 'yyyy-M-d')}`,
    );

    await this.cacheMaterial.invalidate(
      `provider-checklist:${provider_id}:${format(file.schedule, 'yyyy-M-d')}`,
    );

    await this.cacheMaterial.invalidate(
      `provider-paralelas:${provider_id}:${format(file.schedule, 'yyyy-M-d')}`,
    );

    await this.cacheFile.invalidate(`provider-files:${provider_id}`);
  }
}

export default DeleteFileService;
