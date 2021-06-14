import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PdfController from '../controllers/PdfController';

const pdfRouter = Router();
const pdfController = new PdfController();

pdfRouter.use(ensureAuthenticated);

pdfRouter.get(
  '/',
  celebrate({
    [Segments.QUERY]: {
      year: Joi.string().required(),
      month: Joi.string().required(),
      day: Joi.string().required(),
    },
  }),
  pdfController.index,
);

export default pdfRouter;
