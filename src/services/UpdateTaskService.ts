import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Goal from '../models/Goal';
import Task from '../models/Task';
import User from '../models/User';

interface Request {
  id: string;
  userId: string;
}

class UpdateTaskService {
  public async execute({ id, userId }: Request): Promise<User> {
    const taskRepository = getRepository(Task);
    const goalRepository = getRepository(Goal);
    const userRepository = getRepository(User);

    const task = await taskRepository.findOne(id);

    if (!task) {
      throw new AppError('Task does not exist');
    }

    if (task.done) {
      throw new AppError('Task already updated');
    }

    const goal = await goalRepository.findOne(task.goal_id);
    const user = await userRepository.findOne(userId);

    if(!user){
      throw new AppError('User does not exist');
    }

    if (!goal) {
      throw new AppError('Goal does not exist');
    }

    if (goal.user_id !== userId) {
      throw new AppError('Goal does not exist for this user');
    }

    task.done = true;
    await taskRepository.save(task);

    const tasks = await taskRepository.find({ where: { goal_id: goal.id } });

    if (tasks.every(t => t.done)) {
        user.balance += goal.points;
        await userRepository.save(user);
    }

    return user;
  }
}

export default UpdateTaskService;
