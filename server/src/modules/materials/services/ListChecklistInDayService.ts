import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheMaterial from '@shared/container/providers/CacheMaterial/models/ICacheMaterial';
import IChecklistRepository from '../repositories/IChecklistRepository';
import Material from '../infra/typeorm/entities/Material';

interface IRequest {
  provider_id: string;
  year: number;
  month: number;
  day: number;
}

@injectable()
class ListChecklistInDayService {
  constructor(
    @inject('ChecklistRepository')
    private checklistRepository: IChecklistRepository,

    @inject('CacheMaterial')
    private cacheMaterial: ICacheMaterial,
  ) {}

  public async execute({
    provider_id,
    year,
    month,
    day,
  }: IRequest): Promise<Material[]> {
    const cacheKey = `provider-checklist:${provider_id}:${year}-${month}-${day}`;

    let materials = await this.cacheMaterial.recover<Material[]>(cacheKey);

    if (!materials) {
      materials = await this.checklistRepository.findChecklistInDayFromProvider(
        {
          provider_id,
          year,
          month,
          day,
        },
      );

      await this.cacheMaterial.save(cacheKey, classToClass(materials));
    }

    return materials;
  }
}

export default ListChecklistInDayService;
