import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Goal from '../models/Goal';
import Task from '../models/Task';

interface Request {
  id: string;
  user: string;
}

class DeleteGoalService {
  public async execute({ id, user }: Request): Promise<void> {
    const goalRepository = getRepository(Goal);
    const taskRepository = getRepository(Task);

    const goal = await goalRepository.findOne(id);

    const tasks = await taskRepository.find({ where: { goal_id: id } });

    if (!goal) {
      throw new AppError('Goal does not exist');
    }

    if (goal.user_id !== user) {
      throw new AppError('Goal does not exist');
    }

    if (tasks.length) {
      await taskRepository.remove(tasks);
    }

    await goalRepository.remove(goal);
  }
}

export default DeleteGoalService;
