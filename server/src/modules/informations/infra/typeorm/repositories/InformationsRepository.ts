import { getRepository, Repository } from 'typeorm';

import IInformationsRepository from '@modules/informations/repositories/IInformationsRepository';
import ICreateInformationDTO from '@modules/informations/dtos/ICreateInformationDTO';

import Information from '../entities/Information';

class InformationsRepository implements IInformationsRepository {
  private ormRepository: Repository<Information>;

  constructor() {
    this.ormRepository = getRepository(Information);
  }

  public async create(data: ICreateInformationDTO[]): Promise<Information[]> {
    const information = this.ormRepository.create(data);

    await this.ormRepository.save(information);

    return information;
  }

  public async update(data: Information): Promise<Information> {
    return this.ormRepository.save(data);
  }

  public async save(information: Information[]): Promise<void> {
    await this.ormRepository.save(information);
  }

  public async delete(information_id: string): Promise<void> {
    await this.ormRepository.delete(information_id);
  }

  public async findAllInformations(
    provider_id: string,
    user_id: string,
  ): Promise<Information[]> {
    const findInformations = await this.ormRepository.find({
      relations: ['provider', 'user_send'],
      where: {
        provider_id,
        user_id_from: user_id,
      },
      order: {
        created_at: 'DESC',
      },
    });

    return findInformations;
  }

  public async findByTitle(title: string): Promise<Information | undefined> {
    const findInformations = await this.ormRepository.findOne({
      where: { title },
    });

    return findInformations;
  }

  public async findById(id: string): Promise<Information | undefined> {
    const signal = await this.ormRepository.findOne(id);

    return signal;
  }
}

export default InformationsRepository;
