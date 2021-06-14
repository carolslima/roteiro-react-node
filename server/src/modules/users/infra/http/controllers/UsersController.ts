// Restful: index, show, create, update, delete
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import ListAllUsersInProvider from '@modules/users/services/ListAllUsersInProvider';
import ListAllUsers from '@modules/users/services/ListAllUsers';

import User from '../../typeorm/entities/User';

export default class UsersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id: except_user_id, provider_id, role } = request.user;
    let users: User[];

    if (Number(role) === 3) {
      const listAllUsers = container.resolve(ListAllUsers);

      users = await listAllUsers.execute({
        except_user_id,
      });
    } else {
      const listAllUsersInProvider = container.resolve(ListAllUsersInProvider);

      users = await listAllUsersInProvider.execute({
        except_user_id,
        provider_id,
      });
    }

    return response.json(classToClass(users));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password, role, provider_id } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
      role,
      provider_id,
    });

    return response.status(201).json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const { field, value } = request.body;

    const updateUser = container.resolve(UpdateUserService);

    const user = await updateUser.execute({
      user_id,
      field,
      value,
    });

    return response.status(200).json(user);
  }
}
