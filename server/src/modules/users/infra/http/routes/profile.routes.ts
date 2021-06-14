import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ProfileController from '../controllers/ProfileController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthenticated);

profileRouter.get('/', profileController.show);

profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required().min(3).max(150),
      email: Joi.string().email().min(3).max(100).required(),
      old_password: Joi.string().min(3).max(50),
      password: Joi.string().min(3).max(50),
      password_confirmation: Joi.string()
        .min(3)
        .max(50)
        .valid(Joi.ref('password')),
    },
  }),
  profileController.update,
);

export default profileRouter;
