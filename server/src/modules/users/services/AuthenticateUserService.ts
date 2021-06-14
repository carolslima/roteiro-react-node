import { sign } from 'jsonwebtoken';
import { injectable, inject } from 'tsyringe';

import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequestDTO {
  email: string;
  password: string;
}

interface IResponseDTO {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    email,
    password,
  }: IRequestDTO): Promise<IResponseDTO> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email or password combination.', 401);
    }

    if (!user.status) {
      throw new AppError('Unauthorized', 401);
    }

    const passwordMatches = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatches) {
      throw new AppError('Incorrect email or password combination.', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign(
      {
        provider_id: user.provider_id,
        role: user.role,
      },
      secret,
      {
        subject: user.id,
        expiresIn,
      },
    );

    return { user, token };
  }
}

export default AuthenticateUserService;
