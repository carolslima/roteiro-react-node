import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListParalelasInDayService from '@modules/materials/services/ListParalelasInDayService';

class ParalelasInDayController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.user;
    const { day, month, year } = request.query;

    const listParalelasInDay = container.resolve(ListParalelasInDayService);

    const paralelas = await listParalelasInDay.execute({
      provider_id,
      year: Number(year),
      month: Number(month),
      day: Number(day),
    });

    return response.json(classToClass(paralelas));
  }
}

export default ParalelasInDayController;
