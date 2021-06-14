import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IProvidersRepository from '@modules/providers/repositories/IProvidersRepository';
import ProvidersRepository from '@modules/providers/infra/typeorm/repositories/ProvidersRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserTokensRepository from '@modules/users/infra/typeorm/repositories/UserTokensRepository';

import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import NotificationsRepository from '@modules/notifications/infra/typeorm/repositories/NotificationsRepository';

import ISignalsRepository from '@modules/signals/repositories/ISignalsRepository';
import SignalsRepository from '@modules/signals/infra/typeorm/repositories/SignalsRepository';

import IInformationsRepository from '@modules/informations/repositories/IInformationsRepository';
import InformationsRepository from '@modules/informations/infra/typeorm/repositories/InformationsRepository';

import IMaterialsRepository from '@modules/materials/repositories/IMaterialsRepository';
import MaterialsRepository from '@modules/materials/infra/typeorm/repositories/MaterialsRepository';

import IFilesRepository from '@modules/materials/repositories/IFilesRepository';
import FilesRepository from '@modules/materials/infra/typeorm/repositories/FilesRepository';

import IChecklistRepository from '@modules/materials/repositories/IChecklistRepository';
import ChecklistRepository from '@modules/materials/infra/typeorm/repositories/ChecklistRepository';

import IParalelasRepository from '@modules/materials/repositories/IParalelasRepository';
import ParalelasRepository from '@modules/materials/infra/typeorm/repositories/ParalelasRepository';

container.registerSingleton<IProvidersRepository>(
  'ProvidersRepository',
  ProvidersRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IUserTokensRepository>(
  'UserTokensRepository',
  UserTokensRepository,
);

container.registerSingleton<INotificationsRepository>(
  'NotificationsRepository',
  NotificationsRepository,
);

container.registerSingleton<ISignalsRepository>(
  'SignalsRepository',
  SignalsRepository,
);

container.registerSingleton<IInformationsRepository>(
  'InformationsRepository',
  InformationsRepository,
);

container.registerSingleton<IMaterialsRepository>(
  'MaterialsRepository',
  MaterialsRepository,
);

container.registerSingleton<IFilesRepository>(
  'FilesRepository',
  FilesRepository,
);

container.registerSingleton<IChecklistRepository>(
  'ChecklistRepository',
  ChecklistRepository,
);

container.registerSingleton<IParalelasRepository>(
  'ParalelasRepository',
  ParalelasRepository,
);
