import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheUser from '@shared/container/providers/CacheUser/models/ICacheUser';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
  role: number;
  provider_id: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,

    @inject('CacheUser')
    private cacheUser: ICacheUser,
  ) {}

  public async execute({
    name,
    email,
    password,
    role,
    provider_id,
  }: IRequestDTO): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email address already used.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
      role,
      provider_id,
    });

    await this.cacheUser.invalidatePrefix('provider-users');

    return user;
  }
}

export default CreateUserService;
