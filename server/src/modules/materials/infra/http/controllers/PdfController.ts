import { Request, Response } from 'express';
import { container } from 'tsyringe';

import GeneratePdfService from '@modules/materials/services/GeneratePdfService';

class MaterialsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { year, month, day } = request.query;

    const parsedDay = String(day).padStart(2, '0');
    const parsedMonth = String(month).padStart(2, '0');

    const generatePdfService = container.resolve(GeneratePdfService);

    const pdf = await generatePdfService.execute({
      year: String(year),
      month: parsedMonth,
      day: parsedDay,
      selectorUser: '#email',
      selectorPass: '#password',
      selectorSubmit: '#submit',
    });

    response.contentType('application/pdf');

    return response.send(pdf);
  }
}

export default MaterialsController;
