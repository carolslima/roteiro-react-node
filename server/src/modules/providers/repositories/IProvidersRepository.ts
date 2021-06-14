import Provider from '../infra/typeorm/entities/Provider';
import ICreateProviderDTO from '../dtos/ICreateProviderDTO';

export default interface IUsersRepository {
  findAllProviders(): Promise<Provider[]>;
  findById(id: string): Promise<Provider | undefined>;
  findByEmail(email: string): Promise<Provider | undefined>;
  create(data: ICreateProviderDTO): Promise<Provider>;
  update(data: ICreateProviderDTO): Promise<Provider>;
  save(data: Provider): Promise<Provider>;
}
