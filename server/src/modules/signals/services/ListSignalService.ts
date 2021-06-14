import { injectable, inject } from 'tsyringe';

import ICacheSignal from '@shared/container/providers/CacheSignal/models/ICacheSignal';
import ISignalsRepository from '@modules/signals/repositories/ISignalsRepository';

import Signal from '@modules/signals/infra/typeorm/entities/Signal';

@injectable()
class ListSignalService {
  constructor(
    @inject('SignalsRepository')
    private signalsRepository: ISignalsRepository,

    @inject('CacheSignal')
    private cacheSignal: ICacheSignal,
  ) {}

  public async execute(): Promise<Signal[]> {
    // await this.cacheSignal.invalidate(`signals-list`);

    let signals = await this.cacheSignal.recover<Signal[]>(`signals-list`);

    if (!signals) {
      signals = await this.signalsRepository.findAllSignals();

      await this.cacheSignal.save(`signals-list`, signals);
    }

    return signals;
  }
}

export default ListSignalService;
