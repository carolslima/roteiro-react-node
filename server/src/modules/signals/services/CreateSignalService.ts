import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheSignal from '@shared/container/providers/CacheSignal/models/ICacheSignal';
import Signal from '../infra/typeorm/entities/Signal';
import ISignalsRepository from '../repositories/ISignalsRepository';

interface IRequestDTO {
  name: string;
  type: string;
}

@injectable()
class CreateSignalService {
  constructor(
    @inject('SignalsRepository')
    private signalsRepository: ISignalsRepository,

    @inject('CacheSignal')
    private cacheSignal: ICacheSignal,
  ) {}

  public async execute({ name, type }: IRequestDTO): Promise<Signal> {
    const checkSignalExists = await this.signalsRepository.findByName(name);

    if (checkSignalExists) {
      throw new AppError('Signal name already used.');
    }

    const signal = this.signalsRepository.create({
      name,
      type,
    });

    await this.cacheSignal.invalidate(`signals-list`);

    return signal;
  }
}

export default CreateSignalService;
