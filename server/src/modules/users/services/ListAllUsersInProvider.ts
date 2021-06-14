import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  except_user_id: string;
  provider_id: string;
}

@injectable()
class ListAllUsersInProvider {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    except_user_id,
    provider_id,
  }: IRequest): Promise<User[]> {
    const user = await this.usersRepository.findAllUsersInProvider({
      except_user_id,
      provider_id,
    });

    if (!user) {
      throw new AppError('User not found.');
    }

    return user;
  }
}

export default ListAllUsersInProvider;
