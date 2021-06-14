import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheFile from '@shared/container/providers/CacheFile/models/ICacheFile';
import IFilesRepository from '../repositories/IFilesRepository';
import File from '../infra/typeorm/entities/File';

@injectable()
class ListFilesService {
  constructor(
    @inject('FilesRepository')
    private filesRepository: IFilesRepository,

    @inject('CacheFile')
    private cacheFile: ICacheFile,
  ) {}

  public async execute(provider_id: string): Promise<File[]> {
    // await this.cacheFile.invalidate(`provider-files:${provider_id}`);

    const cacheKey = `provider-files:${provider_id}`;

    let files = await this.cacheFile.recover<File[]>(cacheKey);

    if (!files) {
      files = await this.filesRepository.findAllInMonth(provider_id);

      await this.cacheFile.save(cacheKey, classToClass(files));
    }

    return files;
  }
}

export default ListFilesService;
