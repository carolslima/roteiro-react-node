import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import SessionsController from '../controllers/SessionsController';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().min(3).max(100).required(),
      password: Joi.string().min(3).max(50).required(),
    },
  }),
  sessionsController.create,
);

export default sessionsRouter;
