import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ParalelasInDayController from '../controllers/ParalelasInDayController';

const paralelasRouter = Router();
const paralelasInDayController = new ParalelasInDayController();

// NOTES:
// DTO: Data Transfer Object
// SoC: Separation of Concerns (Separação de Preocupações)
// Rota: Receber a requisição, chama outro arquivo, devolver uma resposta

paralelasRouter.use(ensureAuthenticated);

paralelasRouter.get('/', paralelasInDayController.index);

export default paralelasRouter;
