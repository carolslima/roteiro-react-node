import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  except_user_id: string;
}

@injectable()
class ListAllUsers {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ except_user_id }: IRequest): Promise<User[]> {
    const user = await this.usersRepository.findAllUsers({
      except_user_id,
    });

    if (!user) {
      throw new AppError('Users not found.');
    }

    return user;
  }
}

export default ListAllUsers;
