// Restful: index, show, create, update, delete
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateProviderAvatarService from '@modules/providers/services/UpdateProviderAvatarService';
import { classToClass } from 'class-transformer';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateProviderAvatar = container.resolve(UpdateProviderAvatarService);

    const user = await updateProviderAvatar.execute({
      provider_id: request.params.provider_id,
      avatarFilename: request.file.filename,
    });

    return response.status(200).json(classToClass(user));
  }
}
