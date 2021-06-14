import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateMaterialService from '@modules/materials/services/CreateMaterialService';
import UpdateMaterialService from '@modules/materials/services/UpdateMaterialService';
import DeleteMaterialService from '@modules/materials/services/DeleteMaterialService';

import ListMaterialsInDayService from '@modules/materials/services/ListMaterialsInDayService';

class MaterialsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.user;
    const { day, month, year } = request.query;

    const listMaterialsInDay = container.resolve(ListMaterialsInDayService);

    const materials = await listMaterialsInDay.execute({
      provider_id,
      year: Number(year),
      month: Number(month),
      day: Number(day),
    });

    return response.json(classToClass(materials));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { id: user_id, provider_id } = request.user;

    const {
      cm,
      title,
      duration,
      type,
      client,
      signal_id,
      position,
      program,
      include,
      blank,
      details,
      schedule,
      list_position,
      file_id,
    } = request.body;

    // const parsedDate = parseISO(date);

    const createMaterial = container.resolve(CreateMaterialService);

    const material = await createMaterial.execute({
      cm,
      title,
      duration,
      type,
      client,
      signal_id,
      position,
      program,
      include,
      user_id_create: user_id,
      user_id_update: user_id,
      status: true,
      blank,
      details,
      provider_id,
      list_position,
      schedule,
      file_id,
    });

    return response.status(201).json(material);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { material_id } = request.params;

    const { field, value } = request.body;

    const updateMaterial = container.resolve(UpdateMaterialService);

    const material = await updateMaterial.execute({
      material_id,
      field,
      value,
      user_id_update: user_id,
    });

    return response.status(200).json(material);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.user;

    const { material_id } = request.params;

    const deleteMaterial = container.resolve(DeleteMaterialService);

    await deleteMaterial.execute({ material_id, provider_id });

    return response.status(204).send();
  }
}

export default MaterialsController;
