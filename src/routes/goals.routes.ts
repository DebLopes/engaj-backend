import { Router } from 'express';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const goalsRouter = Router();

goalsRouter.use(ensureAuthenticated);

goalsRouter.get('/', async (request, response) => {


});

goalsRouter.post('/', async (request, response) => {
  const { title, 	description, points,	startDate, 	endDate,tasks } = request.body;

//   const authenticateUser = new AuthenticateUserService();

//   const { user, token } = await authenticateUser.execute({
//     email,
//     password,
//   });

//   const userWithoutPassword = {
//     id: user.id,
//     name: user.name,
//     email: user.email,
//     created_at: user.created_at,
//     updated_at: user.updated_at,
//   };

  return response.json({message: 'oi' });
});

export default goalsRouter;
