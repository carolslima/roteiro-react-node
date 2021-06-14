import { getRepository, Repository, Not } from 'typeorm';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllUsersDTO from '@modules/users/dtos/IFindAllUsersDTO';
import IUpdateUserDTO from '@modules/users/dtos/IUpdateUserDTO';
import IFindAllUsersInProviderDTO from '@modules/users/dtos/IFindAllUsersInProviderDTO';

import User from '../entities/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: { email },
    });

    return user;
  }

  public async findAllUsers({
    except_user_id,
  }: IFindAllUsersDTO): Promise<User[]> {
    const users = await this.ormRepository.find({
      where: {
        id: Not(except_user_id),
      },
      order: {
        name: 'ASC',
      },
    });

    return users;
  }

  public async findAllUsersToInformation(): Promise<User[]> {
    const users = await this.ormRepository.find();

    return users;
  }

  public async findAllUsersInProvider({
    except_user_id,
    provider_id,
  }: IFindAllUsersInProviderDTO): Promise<User[]> {
    const users = await this.ormRepository.find({
      where: {
        id: Not(except_user_id),
        provider_id,
      },
      order: {
        name: 'ASC',
      },
    });

    return users;
  }

  public async findAllUsersInProviderToInformation(
    provider_id: string,
  ): Promise<User[]> {
    const users = await this.ormRepository.find({
      where: {
        provider_id,
      },
      order: {
        name: 'ASC',
      },
    });

    return users;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const appointment = this.ormRepository.create(userData);

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async update(data: IUpdateUserDTO): Promise<User> {
    return this.ormRepository.save(data);
  }

  public async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }
}

export default UsersRepository;
