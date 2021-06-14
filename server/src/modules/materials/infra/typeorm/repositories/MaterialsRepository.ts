import { getRepository, Repository, Raw } from 'typeorm';
import { classToClass } from 'class-transformer';

import IMaterialsRepository from '@modules/materials/repositories/IMaterialsRepository';
import ICreateMaterialDTO from '@modules/materials/dtos/ICreateMaterialDTO';
import IFindAllInDayFromProviderDTO from '@modules/materials/dtos/IFindAllInDayFromProviderDTO';
import IUpdateMaterialDTO from '@modules/materials/dtos/IUpdateMaterialDTO';

import Material from '../entities/Material';

class MaterialsRepository implements IMaterialsRepository {
  private ormRepository: Repository<Material>;

  constructor() {
    this.ormRepository = getRepository(Material);
  }

  public async create(data: ICreateMaterialDTO[]): Promise<Material[]> {
    const material = this.ormRepository.create(data);

    await this.ormRepository.save(material);

    return material;
  }

  public async save(data: Material[]): Promise<Material[]> {
    return this.ormRepository.save(data);
  }

  public async update(data: IUpdateMaterialDTO): Promise<Material> {
    return this.ormRepository.save(data);
  }

  public async offline(data: Material[]): Promise<Material[]> {
    return this.ormRepository.save(data);
  }

  public async delete(material_id: string): Promise<void> {
    await this.ormRepository.delete(material_id);
  }

  public async deleteAllMaterialsWithFileId(data: Material[]): Promise<void> {
    await this.ormRepository.remove(data);
  }

  public async findById(material_id: string): Promise<Material | undefined> {
    const material = await this.ormRepository.findOne(material_id);

    return material;
  }

  public async findByFileId(file_id: string): Promise<Material[] | undefined> {
    const material = await this.ormRepository.find({ where: { file_id } });

    return material;
  }

  public async findByDate(
    date: Date,
    provider_id: string,
  ): Promise<Material | undefined> {
    const findMaterial = await this.ormRepository.findOne({
      where: { date, provider_id },
    });

    return findMaterial;
  }

  public async findAllInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindAllInDayFromProviderDTO): Promise<Material[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const materials = await this.ormRepository.find({
      relations: ['provider', 'user_create', 'user_update', 'signal', 'file'],
      where: {
        provider_id,
        schedule: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
      order: {
        list_position: 'ASC',
      },
    });

    return classToClass(materials);
  }
}

export default MaterialsRepository;
