import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import InformationsController from '../controllers/InformationsController';

const informationsRouter = Router();
const informationsController = new InformationsController();

informationsRouter.use(ensureAuthenticated);

informationsRouter.get('/', informationsController.index);

informationsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      type: Joi.string().required(),
      content: Joi.string().required(),
      all_providers: Joi.boolean().required(),
    },
  }),
  informationsController.create,
);

informationsRouter.patch(
  '/:information_id',
  celebrate({
    [Segments.PARAMS]: {
      information_id: Joi.string().uuid().required(),
    },
  }),
  informationsController.update,
);

informationsRouter.delete(
  '/:information_id',
  celebrate({
    [Segments.PARAMS]: {
      information_id: Joi.string().uuid().required(),
    },
  }),
  informationsController.delete,
);

export default informationsRouter;
