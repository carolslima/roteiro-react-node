import { Router } from 'express';

import providersRouter from '@modules/providers/infra/http/routes/providers.routes';
import usersRouter from '@modules/users/infra/http/routes/users.routes';
import sessionsRouter from '@modules/users/infra/http/routes/sessions.routes';
import passwordRouter from '@modules/users/infra/http/routes/password.routes';
import profileRouter from '@modules/users/infra/http/routes/profile.routes';
import signalsRouter from '@modules/signals/infra/http/routes/signals.routes';
import informationsRouter from '@modules/informations/infra/http/routes/informations.routes';
import materialsRouter from '@modules/materials/infra/http/routes/materials.routes';
import filesRouter from '@modules/materials/infra/http/routes/files.routes';
import checklistRouter from '@modules/materials/infra/http/routes/checklist.routes';
import paralelasRouter from '@modules/materials/infra/http/routes/paralelas.routes';
import pdfRouter from '@modules/materials/infra/http/routes/pdf.routes';

const routes = Router();

routes.use('/providers', providersRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);
routes.use('/signals', signalsRouter);
routes.use('/informations', informationsRouter);
routes.use('/materials', materialsRouter);
routes.use('/files', filesRouter);
routes.use('/checklist', checklistRouter);
routes.use('/paralelas', paralelasRouter);
routes.use('/pdf', pdfRouter);

export default routes;
