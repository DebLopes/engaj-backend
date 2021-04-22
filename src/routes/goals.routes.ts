import { Router } from 'express';
import { parseISO } from 'date-fns';

import { getRepository } from 'typeorm';

import CreateGoalService from '../services/CreateGoalService';
import CreateGoalTasks from '../services/CreateGoalTasks';

import Goal from '../models/Goal';
import Task from '../models/Task';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const goalsRouter = Router();

goalsRouter.use(ensureAuthenticated);

goalsRouter.get('/', async (request, response) => {
  const user = request.user.id;
  const goalRepository = getRepository(Goal);
  const taskRepository = getRepository(Task);

  const goals = await goalRepository.find({ where: { user_id: user } });

  const listaGoals = await Promise.all(goals.map(async goal => {
    const tasks = await taskRepository.find({ where: { goal_id: goal.id } });
    return { ...goal, tasks }
  }));


  return response.json(listaGoals);
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
