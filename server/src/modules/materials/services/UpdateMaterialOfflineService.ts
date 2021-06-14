import { injectable, inject } from 'tsyringe';

import ICacheMaterial from '@shared/container/providers/CacheMaterial/models/ICacheMaterial';
import Material from '../infra/typeorm/entities/Material';
import IMaterialsRepository from '../repositories/IMaterialsRepository';

interface IRequestDTO {
  data: Material[];
  provider_id: string;
}

@injectable()
class UpdateMaterialOfflineService {
  constructor(
    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,

    @inject('CacheMaterial')
    private cacheMaterial: ICacheMaterial,
  ) {}

  public async execute({
    data,
    provider_id,
  }: IRequestDTO): Promise<Material[]> {
    const materials = await this.materialsRepository.offline(data);

    await this.cacheMaterial.invalidate(`provider-materials:${provider_id}`);

    await this.cacheMaterial.invalidate(`provider-checklist:${provider_id}`);

    await this.cacheMaterial.invalidate(`provider-paralelas:${provider_id}`);

    return materials;
  }
}

export default UpdateMaterialOfflineService;
