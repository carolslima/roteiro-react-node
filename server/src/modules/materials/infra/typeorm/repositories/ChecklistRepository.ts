import { getRepository, Repository, Raw } from 'typeorm';
import { classToClass } from 'class-transformer';

import IChecklistRepository from '@modules/materials/repositories/IChecklistRepository';
import IFindChecklistInDayFromProviderDTO from '@modules/materials/dtos/IFindChecklistInDayFromProviderDTO';

import Material from '../entities/Material';

class ChecklistRepository implements IChecklistRepository {
  private ormRepository: Repository<Material>;

  constructor() {
    this.ormRepository = getRepository(Material);
  }

  public async findChecklistInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindChecklistInDayFromProviderDTO): Promise<Material[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const checklist = await this.ormRepository.find({
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

    const checklistFiltered = checklist
      .filter(material => material.blank === false)
      // .filter(material => material.signal !== null)
      .filter(material => material.signal.name === 'SWA');

    return classToClass(checklistFiltered);
  }
}

export default ChecklistRepository;
