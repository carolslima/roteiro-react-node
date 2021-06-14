import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';

import uploadConfig from '@config/upload';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import FilesController from '../controllers/FilesController';

const filesRouter = Router();
const filesController = new FilesController();

const upload = multer(uploadConfig.multer);

filesRouter.use(ensureAuthenticated);

filesRouter.get('/', filesController.index);

filesRouter.post('/', upload.single('file'), filesController.create);

filesRouter.delete(
  '/:file_id',
  celebrate({
    [Segments.PARAMS]: {
      file_id: Joi.string().uuid().required(),
    },
  }),
  filesController.delete,
);

export default filesRouter;
