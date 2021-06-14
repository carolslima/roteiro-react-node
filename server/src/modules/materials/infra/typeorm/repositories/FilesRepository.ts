import { getRepository, Repository, Between } from 'typeorm';
import { startOfMonth, endOfMonth } from 'date-fns';

import IFilesRepository from '@modules/materials/repositories/IFilesRepository';
import ICreateFileDTO from '@modules/materials/dtos/ICreateFileDTO';

import File from '../entities/File';

class FilesRepository implements IFilesRepository {
  private ormRepository: Repository<File>;

  constructor() {
    this.ormRepository = getRepository(File);
  }

  public async create({
    name,
    path,
    size,
    user_id_create,
    provider_id,
    schedule,
    canceled,
  }: ICreateFileDTO): Promise<File> {
    const material = this.ormRepository.create({
      name,
      path,
      size,
      user_id_create,
      provider_id,
      schedule,
      canceled,
    });

    await this.ormRepository.save(material);

    return material;
  }

  public async save(file: File): Promise<File> {
    return this.ormRepository.save(file);
  }

  public async delete(file_id: string): Promise<void> {
    await this.ormRepository.delete(file_id);
  }

  public async findById(id: string): Promise<File | undefined> {
    const file = await this.ormRepository.findOne(id);

    return file;
  }

  public async findAllInMonth(provider_id: string): Promise<File[]> {
    const today = new Date();

    const files = await this.ormRepository.find({
      where: {
        provider_id,
        schedule: Between(startOfMonth(today), endOfMonth(today)),
      },
      order: {
        schedule: 'ASC',
      },
    });

    return files;
  }
}

export default FilesRepository;
