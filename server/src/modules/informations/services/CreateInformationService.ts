import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Information from '@modules/informations/infra/typeorm/entities/Information';
import User from '@modules/users/infra/typeorm/entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IInformationsRepository from '../repositories/IInformationsRepository';

interface IRequestDTO {
  content: string;
  all_providers?: boolean;
  user_id_send: string;
  user_id_from?: string;
  provider_id: string;
  read?: boolean;
  type: string;
}

@injectable()
class CreateNotificationService {
  constructor(
    @inject('InformationsRepository')
    private informationsRepository: IInformationsRepository,

    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    content,
    all_providers,
    user_id_send,
    provider_id,
    type,
  }: IRequestDTO): Promise<Information[]> {
    let users: User[] = [];

    if (all_providers) {
      users = await this.usersRepository.findAllUsersToInformation();
    } else {
      users = await this.usersRepository.findAllUsersInProviderToInformation(
        provider_id,
      );
    }

    const selectedUsers: IRequestDTO[] = [];

    if (users) {
      users.map(user => {
        return selectedUsers.push({
          content,
          user_id_send,
          user_id_from: user.id,
          provider_id: user.provider_id,
          read: false,
          type,
        });
      });
    }

    const information = await this.informationsRepository.create(selectedUsers);

    if (all_providers) {
      await this.cacheProvider.invalidatePrefix(`providers-informations`);
    } else {
      await this.cacheProvider.invalidate(
        `providers-informations:${provider_id}`,
      );
    }

    return information;
  }
}

export default CreateNotificationService;
