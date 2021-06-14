import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ChecklistInDayController from '../controllers/ChecklistInDayController';

const checklistRouter = Router();
const checklistInDayController = new ChecklistInDayController();

// NOTES:
// DTO: Data Transfer Object
// SoC: Separation of Concerns (Separação de Preocupações)
// Rota: Receber a requisição, chama outro arquivo, devolver uma resposta

checklistRouter.use(ensureAuthenticated);

checklistRouter.get('/', checklistInDayController.index);

export default checklistRouter;
