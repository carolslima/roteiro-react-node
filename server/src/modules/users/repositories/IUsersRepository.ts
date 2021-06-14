import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';
import IUpdateUserDTO from '../dtos/IUpdateUserDTO';
import IFindAllUsersDTO from '../dtos/IFindAllUsersDTO';
import IFindAllUsersInProviderDTO from '../dtos/IFindAllUsersInProviderDTO';

export default interface IUsersRepository {
  findAllUsers({ except_user_id }: IFindAllUsersDTO): Promise<User[]>;
  findAllUsersToInformation(): Promise<User[]>;
  findAllUsersInProvider({
    except_user_id,
    provider_id,
  }: IFindAllUsersInProviderDTO): Promise<User[]>;
  findAllUsersInProviderToInformation(provider_id: string): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  update(data: IUpdateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
