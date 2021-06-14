import { getRepository, Repository } from 'typeorm';

import ISignalsRepository from '@modules/signals/repositories/ISignalsRepository';
import ICreateSignalDTO from '@modules/signals/dtos/ICreateSignalDTO';

import Signal from '../entities/Signal';

class SignalsRepository implements ISignalsRepository {
  private ormRepository: Repository<Signal>;

  constructor() {
    this.ormRepository = getRepository(Signal);
  }

  public async create({ name, type }: ICreateSignalDTO): Promise<Signal> {
    const signal = this.ormRepository.create({
      name,
      type,
    });

    await this.ormRepository.save(signal);

    return signal;
  }

  public async save(signal: Signal): Promise<Signal> {
    return this.ormRepository.save(signal);
  }

  public async createArray(data: ICreateSignalDTO[]): Promise<Signal[]> {
    const createdSignal = this.ormRepository.create(data);

    const signals = await this.ormRepository.save(createdSignal);

    return signals;
  }

  public async findAllSignals(): Promise<Signal[]> {
    const findSignals = await this.ormRepository.find({
      order: {
        name: 'ASC',
      },
    });

    return findSignals;
  }

  public async findByName(name: string): Promise<Signal | undefined> {
    const findSignals = await this.ormRepository.findOne({ where: { name } });

    return findSignals;
  }

  public async findByType(type: string): Promise<Signal | undefined> {
    const signal = await this.ormRepository.findOne({ where: { type } });

    return signal;
  }

  public async findById(id: string): Promise<Signal | undefined> {
    const signal = await this.ormRepository.findOne(id);

    return signal;
  }

  public async delete(signal_id: string): Promise<void> {
    await this.ormRepository.delete(signal_id);
  }
}

export default SignalsRepository;
