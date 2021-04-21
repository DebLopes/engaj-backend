import { Router } from 'express';
import { parseISO } from 'date-fns';

import CreateGoalService from '../services/CreateGoalService';
import CreateGoalTasks from '../services/CreateGoalTasks';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const goalsRouter = Router();

goalsRouter.use(ensureAuthenticated);

goalsRouter.get('/', async (request, response) => {


});

goalsRouter.post('/', async (request, response) => {
  const { title, description, points, startDate, endDate, tasks } = request.body;

  const user = request.user.id;
  const createGoalService = new CreateGoalService();
  const createGoalTasks = new CreateGoalTasks();

  const parseStartDate = parseISO(startDate);
  const parseEndDate = parseISO(endDate);

  const goal = await createGoalService.execute({
    title,
    description,
    points,
    startDate: parseStartDate,
    endDate: parseEndDate,
    user_id: user
  });

  const listTasks = await createGoalTasks.execute({
    tasks,
    goal_id: goal.id
  })

  return response.json({ ...goal, listTasks });
});

export default goalsRouter;
