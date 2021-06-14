import { Request, Response } from 'express';
import { container } from 'tsyringe';

import UpdateMaterialOfflineService from '@modules/materials/services/UpdateMaterialOfflineService';

class MaterialsController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.user;
    const { data } = request.body;

    const updateMaterial = container.resolve(UpdateMaterialOfflineService);

    const materials = await updateMaterial.execute({
      data,
      provider_id,
    });

    return response.status(200).json(materials);
  }
}

export default MaterialsController;
