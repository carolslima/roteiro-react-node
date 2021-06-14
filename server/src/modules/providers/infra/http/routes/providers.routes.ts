import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ensureRoleAccess from '@modules/users/infra/http/middlewares/ensureRoleAccess';
import ProvidersController from '../controllers/ProvidersController';
import ProviderAvatarController from '../controllers/ProviderAvatarController';

const providersRouter = Router();
const upload = multer(uploadConfig.multer);
const providersController = new ProvidersController();
const providerAvatarController = new ProviderAvatarController();

providersRouter.use(ensureAuthenticated);
providersRouter.use(ensureRoleAccess);

providersRouter.get('/', providersController.index);

providersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(3).max(150).required(),
      email_provider: Joi.string().min(3).max(150).required(),
      email_jornalism: Joi.string().min(3).max(150).required(),
      email_opec: Joi.string().min(3).max(150).required(),
      state: Joi.string().min(3).max(150).required(),
      city: Joi.string().min(3).max(150).required(),
    },
  }),
  providersController.create,
);

providersRouter.patch(
  '/avatar/:provider_id',
  upload.single('avatar'),
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
  }),
  providerAvatarController.update,
);

providersRouter.put(
  '/:provider_id',
  celebrate({
    [Segments.PARAMS]: {
      provider_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      field: Joi.string(),
      value: Joi.any(),
    },
  }),
  providersController.update,
);

export default providersRouter;
