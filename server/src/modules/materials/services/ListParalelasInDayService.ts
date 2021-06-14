import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheMaterial from '@shared/container/providers/CacheMaterial/models/ICacheMaterial';
import IParalelasRepository from '../repositories/IParalelasRepository';
import Material from '../infra/typeorm/entities/Material';

interface IRequest {
  provider_id: string;
  year: number;
  month: number;
  day: number;
}

@injectable()
class ListParalelasInDayService {
  constructor(
    @inject('ParalelasRepository')
    private paralelasRepository: IParalelasRepository,

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
      `provider-paralelas:${provider_id}:${year}-${month}-${day}`,
    );

    const cacheKey = `provider-paralelas:${provider_id}:${year}-${month}-${day}`;

    let paralelas = await this.cacheMaterial.recover<Material[]>(cacheKey);

    if (!paralelas) {
      paralelas = await this.paralelasRepository.findParalelasInDayFromProvider(
        {
          provider_id,
          year,
          month,
          day,
        },
      );

      await this.cacheMaterial.save(cacheKey, classToClass(paralelas));
    }

    return paralelas;
  }
}

export default ListParalelasInDayService;
