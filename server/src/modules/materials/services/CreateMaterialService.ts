import { injectable, inject } from 'tsyringe';
import { format } from 'date-fns';

import ICacheMaterial from '@shared/container/providers/CacheMaterial/models/ICacheMaterial';
import Material from '../infra/typeorm/entities/Material';
import IMaterialsRepository from '../repositories/IMaterialsRepository';

/**
 * [x] Recebiento das Informações
 * [x] Tratativa de erros/excessões
 * [x] Acesso ao repositório
 */

interface IRequest {
  cm: number;
  title: string;
  duration?: number;
  type?: string;
  client?: string;
  signal_id?: string;
  position?: string;
  program?: string;
  include?: boolean;
  user_id_create: string;
  user_id_update: string;
  status?: boolean;
  blank: boolean;
  details?: string;
  provider_id: string;
  list_position: number;
  file_id: string;
  schedule: Date;
}

/**
 * SOLID
 * - Single Responsability Principle
 * - Open Closed Principle
 * - Liskov Substitution Principle
 * - Interface Segragation Principle
 * - Dependency Inversion Principle

 * DRY
 * - Don't Repeat Yourself
 */

@injectable()
class CreateMaterialService {
  constructor(
    @inject('MaterialsRepository')
    private materialsRepository: IMaterialsRepository,

    @inject('CacheMaterial')
    private cacheMaterial: ICacheMaterial,
  ) {}

  public async execute({
    cm,
    title,
    duration,
    type,
    client,
    signal_id,
    position,
    program,
    include,
    user_id_create,
    user_id_update,
    status,
    blank,
    details,
    provider_id,
    list_position,
    file_id,
    schedule,
  }: IRequest): Promise<Material[]> {
    const material = await this.materialsRepository.create([
      {
        cm,
        title,
        duration,
        type,
        client,
        signal_id,
        position,
        program,
        include,
        user_id_create,
        user_id_update,
        status,
        blank,
        details,
        provider_id,
        list_position,
        file_id,
        schedule,
      },
    ]);

    await this.cacheMaterial.invalidate(
      `provider-materials:${provider_id}:${format(schedule, 'yyyy-M-d')}`,
    );

    await this.cacheMaterial.invalidate(
      `provider-checklist:${provider_id}:${format(schedule, 'yyyy-M-d')}`,
    );

    await this.cacheMaterial.invalidate(
      `provider-paralelas:${provider_id}:${format(schedule, 'yyyy-M-d')}`,
    );

    return material;
  }
}

export default CreateMaterialService;
