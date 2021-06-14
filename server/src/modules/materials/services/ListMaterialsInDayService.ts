import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheMaterial from '@shared/container/providers/CacheMaterial/models/ICacheMaterial';
import IMaterialsRepository from '../repositories/IMaterialsRepository';
import Material from '../infra/typeorm/entities/Material';

interface IRequest {
  provider_id: string;
  year: number;
  month: number;
  day: number;
}

@injectable()
class ListMaterialsInDayService {
  constructor(
    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,

    @inject('CacheMaterial')
    private cacheMaterial: ICacheMaterial,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<Material[]> {
    await this.cacheMaterial.invalidate(
      `provider-materials:${provider_id}:${year}-${month}-${day}`,
    );

    const cacheKey = `provider-materials:${provider_id}:${year}-${month}-${day}`;

    let materials = await this.cacheMaterial.recover<Material[]>(cacheKey);

    if (!materials) {
      materials = await this.materialsRepository.findAllInDayFromProvider({
        provider_id,
        year,
        month,
        day,
      });

      await this.cacheMaterial.save(cacheKey, classToClass(materials));
    }

    return materials;
  }
}

export default ListMaterialsInDayService;
