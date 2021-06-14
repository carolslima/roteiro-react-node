import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CreateInformationService from '@modules/informations/services/CreateInformationService';
import ListInformationsService from '@modules/informations/services/ListInformationsService';
import DeleteInformationService from '@modules/informations/services/DeleteInformationService';
import UpdateMarkAsReadService from '@modules/informations/services/UpdateMarkAsReadService';

class InformationsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { id: user_id, provider_id } = request.user;

    const listInformations = container.resolve(ListInformationsService);

    const informations = await listInformations.execute({
      user_id,
      provider_id,
    });

    return response.json(informations);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id: user_id_send, provider_id } = request.user;
    const { type, content, all_providers } = request.body;

    const createInformation = container.resolve(CreateInformationService);

    const information = await createInformation.execute({
      content,
      all_providers,
      user_id_send,
      provider_id,
      type,
    });

    return response.status(201).json(information);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id: user_id, provider_id } = request.user;
    const { information_id } = request.params;

    const updateInformation = container.resolve(UpdateMarkAsReadService);

    const information = await updateInformation.execute({
      user_id,
      provider_id,
      information_id,
    });

    return response.status(200).json(information);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id: user_id, provider_id, role } = request.user;

    if (Number(role) !== 3) {
      throw new AppError('Unauthorized', 401);
    }

    const { information_id } = request.params;

    const deleteInformation = container.resolve(DeleteInformationService);

    await deleteInformation.execute({ user_id, provider_id, information_id });

    return response.status(202).send();
  }
}

export default InformationsController;
