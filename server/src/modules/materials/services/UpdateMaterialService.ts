import { injectable, inject } from 'tsyringe';
import { format } from 'date-fns';

import AppError from '@shared/errors/AppError';

import ICacheMaterial from '@shared/container/providers/CacheMaterial/models/ICacheMaterial';
import Material from '../infra/typeorm/entities/Material';
import IMaterialsRepository from '../repositories/IMaterialsRepository';

interface IRequestDTO {
  material_id: string;
  user_id_update: string;
  field: string;
  value: any;
}

@injectable()
class UpdateMaterialService {
  constructor(
    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,

    @inject('CacheMaterial')
    private cacheMaterial: ICacheMaterial,
  ) {}

  public async execute({
    material_id,
    user_id_update,
    field,
    value,
  }: IRequestDTO): Promise<Material> {
    const material = await this.materialsRepository.findById(material_id);

    if (!material) {
      throw new AppError('Material does not exist.');
    }

    Object.assign(material, {
      [field]: value === undefined || value === typeof NaN ? null : value,
      user_id_update,
    });

    await this.materialsRepository.update(material);

    await this.cacheMaterial.invalidate(
      `provider-materials:${material.provider_id}:${format(
        material.schedule,
        'yyyy-M-d',
      )}`,
    );

    await this.cacheMaterial.invalidate(
      `provider-checklist:${material.provider_id}:${format(
        material.schedule,
        'yyyy-M-d',
      )}`,
    );

    await this.cacheMaterial.invalidate(
      `provider-paralelas:${material.provider_id}:${format(
        material.schedule,
        'yyyy-M-d',
      )}`,
    );

    return material;
  }
}

export default UpdateMaterialService;
