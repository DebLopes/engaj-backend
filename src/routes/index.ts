import { Router } from 'express';

import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import goalsRouter from './goals.routes';
import rewardsRouter  from "./rewards.routes";
const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/goals', goalsRouter);
routes.use('/rewards', rewardsRouter);

export default routes;
