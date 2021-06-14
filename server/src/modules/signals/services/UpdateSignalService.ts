import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheSignal from '@shared/container/providers/CacheSignal/models/ICacheSignal';
import Signal from '../infra/typeorm/entities/Signal';
import ISignalsRepository from '../repositories/ISignalsRepository';

interface IRequestDTO {
  signal_id: string;
  name: string;
  type: string;
}

@injectable()
class UpdateSignalService {
  constructor(
    @inject('SignalsRepository')
    private signalsRepository: ISignalsRepository,

    @inject('CacheSignal')
    private cacheSignal: ICacheSignal,
  ) {}

  public async execute({
    signal_id,
    name,
    type,
  }: IRequestDTO): Promise<Signal> {
    const signal = await this.signalsRepository.findById(signal_id);

    if (!signal) {
      throw new AppError('Signal does not exist.');
    }

    const checkSignalNameInUse = await this.signalsRepository.findByName(name);

    if (checkSignalNameInUse) {
      throw new AppError('Signal name is already in use.');
    }

    const checkSignalTypeInUse = await this.signalsRepository.findByType(type);

    if (checkSignalTypeInUse) {
      throw new AppError('Signal type is already in use.');
    }

    Object.assign(signal, { name, type });

    await this.signalsRepository.save(signal);

    await this.cacheSignal.invalidate(`signals-list`);

    return signal;
  }
}

export default UpdateSignalService;
