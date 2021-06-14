import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateProviderService from '@modules/providers/services/CreateProviderService';
import UpdateProviderService from '@modules/providers/services/UpdateProviderService';
import ListProviderService from '@modules/providers/services/ListProvidersService';

class ProvidersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProviders = container.resolve(ListProviderService);

    const providers = await listProviders.execute();

    return response.json(classToClass(providers));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const {
      name,
      email_provider,
      email_jornalism,
      email_opec,
      state,
      city,
    } = request.body;

    const createProvider = container.resolve(CreateProviderService);

    const provider = await createProvider.execute({
      name,
      email_provider,
      email_jornalism,
      email_opec,
      state,
      city,
    });

    return response.status(201).json(provider);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;

    const { field, value } = request.body;

    const updateProvider = container.resolve(UpdateProviderService);

    const provider = await updateProvider.execute({
      provider_id,
      field,
      value,
    });

    return response.status(200).json(provider);
  }
}

export default ProvidersController;
