import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ListChecklistInDayService from '@modules/materials/services/ListChecklistInDayService';

class ChecklistInDayController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.user;
    const { day, month, year } = request.query;

    const listChecklistInDay = container.resolve(ListChecklistInDayService);

    const checklist = await listChecklistInDay.execute({
      provider_id,
      year: Number(year),
      month: Number(month),
      day: Number(day),
    });

    return response.json(classToClass(checklist));
  }
}

export default ChecklistInDayController;
