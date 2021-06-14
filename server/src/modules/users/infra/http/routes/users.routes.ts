import { Router } from 'express';
import multer from 'multer';
import { celebrate, Segments, Joi } from 'celebrate';

import uploadConfig from '@config/upload';

import UsersController from '../controllers/UsersController';
import UserAvatarController from '../controllers/UserAvatarController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ensureRoleAccess from '../middlewares/ensureRoleAccess';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig.multer);

usersRouter.use(ensureAuthenticated);
usersRouter.use(ensureRoleAccess);

usersRouter.get('/', usersController.show);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().min(3).max(150).required(),
      email: Joi.string().email().min(3).max(100).required(),
      password: Joi.string().min(3).max(50).required(),
      role: Joi.number().required(),
      provider_id: Joi.string().required(),
    },
  }),
  usersController.create,
);

usersRouter.patch(
  '/avatar',
  upload.single('avatar'),
  userAvatarController.update,
);

usersRouter.put(
  '/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      field: Joi.string(),
      value: Joi.any(),
    },
  }),
  usersController.update,
);

export default usersRouter;
