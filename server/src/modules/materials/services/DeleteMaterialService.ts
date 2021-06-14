import { injectable, inject } from 'tsyringe';
import { format } from 'date-fns';

import AppError from '@shared/errors/AppError';

import ICacheMaterial from '@shared/container/providers/CacheMaterial/models/ICacheMaterial';
import IMaterialsRepository from '../repositories/IMaterialsRepository';

interface IRequestDTO {
  material_id: string;
  provider_id: string;
}

@injectable()
class DeleteMaterialService {
  constructor(
    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,

    @inject('CacheMaterial')
    private cacheMaterial: ICacheMaterial,
  ) {}

  public async execute({
    material_id,
    provider_id,
  }: IRequestDTO): Promise<void> {
    const material = await this.materialsRepository.findById(material_id);

    if (!material) {
      throw new AppError('Material does not exist.');
    }

    if (material.provider_id !== provider_id) {
      throw new AppError('Unauthorized', 401);
    }

    await this.materialsRepository.delete(material.id);

    await this.cacheMaterial.invalidate(
      `provider-materials:${provider_id}:${format(
        material.schedule,
        'yyyy-M-d',
      )}`,
    );

    await this.cacheMaterial.invalidate(
      `provider-checklist:${provider_id}:${format(
        material.schedule,
        'yyyy-M-d',
      )}`,
    );

    await this.cacheMaterial.invalidate(
      `provider-paralelas:${provider_id}:${format(
        material.schedule,
        'yyyy-M-d',
      )}`,
    );
  }
}

export default DeleteMaterialService;
