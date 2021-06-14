import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import MaterialsController from '../controllers/MaterialsController';
import MaterialsOfflineController from '../controllers/MaterialsOfflineController';

const materialsRouter = Router();
const materialsController = new MaterialsController();
const materialsOfflineController = new MaterialsOfflineController();

// NOTES:
// DTO: Data Transfer Object
// SoC: Separation of Concerns (Separação de Preocupações)
// Rota: Receber a requisição, chama outro arquivo, devolver uma resposta

materialsRouter.use(ensureAuthenticated);

materialsRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      year: Joi.string().required(),
      month: Joi.string().required(),
      day: Joi.string().required(),
    },
  }),
  materialsController.index,
);

materialsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      cm: Joi.any(),
      title: Joi.any(),
      duration: Joi.any(),
      type: Joi.any(),
      client: Joi.any(),
      signal_id: Joi.string().uuid(),
      position: Joi.any(),
      program: Joi.any(),
      include: Joi.any(),
      blank: Joi.any(),
      details: Joi.any(),
      schedule: Joi.date().required(),
      list_position: Joi.number().required(),
      file_id: Joi.string().uuid().required(),
    },
  }),
  materialsController.create,
);

materialsRouter.patch(
  '/:material_id',
  celebrate({
    [Segments.PARAMS]: {
      material_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      field: Joi.string(),
      value: Joi.any(),
    },
  }),
  materialsController.update,
);

materialsRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      data: Joi.any(),
    },
  }),
  materialsOfflineController.update,
);

materialsRouter.delete(
  '/:material_id',
  celebrate({
    [Segments.PARAMS]: {
      material_id: Joi.string().uuid().required(),
    },
  }),
  materialsController.delete,
);

export default materialsRouter;
