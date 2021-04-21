import { getRepository } from 'typeorm';

import Goal from '../models/Goal';

interface Request {
  title: string;
  description: string;
  points: number;
  startDate: Date;
  endDate: Date;
  user_id: string
}

class CreateGoalService {
  public async execute({ title, description, points, startDate, endDate, user_id }: Request): Promise<Goal> {
    const goalRepository = getRepository(Goal);

    const goal = goalRepository.create({
      title,
      description,
      points,
      startDate,
      endDate,
      user_id
    });

    await goalRepository.save(goal);

    return goal;
  }
}

export default CreateGoalService;
