import Signal from '../infra/typeorm/entities/Signal';
import ICreateSignalDTO from '../dtos/ICreateSignalDTO';

export default interface IUsersRepository {
  findAllSignals(): Promise<Signal[]>;
  findById(id: string): Promise<Signal | undefined>;
  findByName(name: string): Promise<Signal | undefined>;
  findByType(type: string): Promise<Signal | undefined>;
  createArray(data: ICreateSignalDTO[]): Promise<Signal[]>;
  create(data: ICreateSignalDTO): Promise<Signal>;
  save(signal: Signal): Promise<Signal>;
  delete(signal_id: string): Promise<void>;
}
