// Restful: index, show, create, update, delete
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import CreateSignalService from '@modules/signals/services/CreateSignalService';
import UpdateSignalService from '@modules/signals/services/UpdateSignalService';
import DeleteSignalService from '@modules/signals/services/DeleteSignalService';
import ListSignalService from '@modules/signals/services/ListSignalService';

class SignalsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listSignals = container.resolve(ListSignalService);

    const signals = await listSignals.execute();

    return response.json(signals);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, type } = request.body;

    const createSignal = container.resolve(CreateSignalService);

    const signal = await createSignal.execute({
      name: String(name).toLowerCase(),
      type: String(type).toUpperCase(),
    });

    return response.status(201).json(signal);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { signal_id } = request.params;
    const { name, type } = request.body;

    const updateSignal = container.resolve(UpdateSignalService);

    const signal = await updateSignal.execute({
      signal_id,
      name: String(name).toLowerCase(),
      type: String(type).toUpperCase(),
    });

    return response.status(200).json(signal);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { role } = request.user;

    if (Number(role) !== 3) {
      throw new AppError('Unauthorized', 401);
    }

    const { signal_id } = request.params;

    const deleteSignal = container.resolve(DeleteSignalService);

    await deleteSignal.execute({ signal_id });

    return response.status(202).send();
  }
}

export default SignalsController;
