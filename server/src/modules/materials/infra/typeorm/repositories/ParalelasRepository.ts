import { getRepository, Repository, Raw } from 'typeorm';
import { classToClass } from 'class-transformer';

import IParalelasRepository from '@modules/materials/repositories/IParalelasRepository';
import IFindParalelaInDayFromProviderDTO from '@modules/materials/dtos/IFindParalelasInDayFromProviderDTO';

import Material from '../entities/Material';

class ParalelasRepository implements IParalelasRepository {
  private ormRepository: Repository<Material>;

  constructor() {
    this.ormRepository = getRepository(Material);
  }

  public async findParalelasInDayFromProvider({
    provider_id,
    day,
    month,
    year,
  }: IFindParalelaInDayFromProviderDTO): Promise<Material[]> {
    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const paralela = await this.ormRepository.find({
      relations: ['provider', 'user_create', 'user_update', 'signal', 'file'],
      where: {
        provider_id,
        schedule: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
        status: true,
        blank: false,
      },
      order: {
        list_position: 'ASC',
      },
    });

    const mustIncludeSigns = ['CA', 'CP', 'IN', 'IT', 'PR', 'GP'];

    const paralelaFiltered = paralela.filter(material =>
      mustIncludeSigns.includes(material.type),
    );

    return classToClass(paralelaFiltered);
  }
}

export default ParalelasRepository;
