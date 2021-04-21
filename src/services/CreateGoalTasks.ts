import { getRepository } from 'typeorm';

import Task from '../models/Task';

interface Request {
  tasks: string[];
  goal_id: string
}

class CreateGoalTasks {
  public async execute({ tasks, goal_id }: Request): Promise<Task[]> {
    const taskRepository = getRepository(Task);

    const createTasks = taskRepository.create(
      tasks.map(task => ({
        description: task,
        goal_id
      }))
    );

    await taskRepository.save(createTasks);

    return createTasks;
  }
}

export default CreateGoalTasks;
