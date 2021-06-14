import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import ICacheUser from '@shared/container/providers/CacheUser/models/ICacheUser';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDTO {
  user_id: string;
  field: string;
  value: string | number | boolean;
}

@injectable()
class UpdateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheUser')
    private cacheUser: ICacheUser,
  ) {}

  public async execute({ user_id, field, value }: IRequestDTO): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User does not exist.');
    }

    if (field === 'email') {
      const checkUserExists = await this.usersRepository.findByEmail(
        user.email,
      );

      if (checkUserExists) {
        throw new AppError('Email address already used.');
      }
    }

    Object.assign(user, {
      [field]: value === undefined || value === typeof NaN ? null : value,
    });

    await this.usersRepository.update(user);

    await this.cacheUser.invalidate(`provider-users:${user.provider_id}`);

    return user;
  }
}

export default UpdateUserService;
