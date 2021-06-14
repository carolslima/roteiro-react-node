import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheSignal from '@shared/container/providers/CacheSignal/models/ICacheSignal';
import ISignalsRepository from '../repositories/ISignalsRepository';

interface IRequestDTO {
  signal_id: string;
}

@injectable()
class UpdateSignalService {
  constructor(
    @inject('SignalsRepository')
    private signalsRepository: ISignalsRepository,

    @inject('CacheSignal')
    private cacheSignal: ICacheSignal,
  ) {}

  public async execute({ signal_id }: IRequestDTO): Promise<void> {
    const signal = await this.signalsRepository.findById(signal_id);

    if (!signal) {
      throw new AppError('Signal does not exist.');
    }

    await this.signalsRepository.delete(signal.id);

    await this.cacheSignal.invalidate(`signals-list`);
  }
}

export default UpdateSignalService;
