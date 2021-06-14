import Information from '../infra/typeorm/entities/Information';
import ICreateInformationDTO from '../dtos/ICreateInformationDTO';

export default interface IInformationsRepository {
  findAllInformations(
    provider_id: string,
    user_id: string,
  ): Promise<Information[]>;
  findById(id: string): Promise<Information | undefined>;
  create(data: ICreateInformationDTO[]): Promise<Information[]>;
  update(data: Information): Promise<Information>;
  save(signal: Information[]): Promise<void>;
  delete(signal_id: string): Promise<void>;
}
