import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import SignalsController from '../controllers/SignalsController';

const signalsRouter = Router();
const signalsController = new SignalsController();

signalsRouter.use(ensureAuthenticated);

signalsRouter.get('/', signalsController.index);

signalsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      type: Joi.string().required(),
    },
  }),
  signalsController.create,
);

signalsRouter.put(
  '/:signal_id',
  celebrate({
    [Segments.PARAMS]: {
      signal_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      type: Joi.string().required(),
    },
  }),
  signalsController.update,
);

signalsRouter.delete(
  '/:signal_id',
  celebrate({
    [Segments.PARAMS]: {
      signal_id: Joi.string().uuid().required(),
    },
  }),
  signalsController.delete,
);

export default signalsRouter;
