import { getRepository } from 'typeorm';

import Reward from '../models/Reward';

interface Request {
  description: string;
  user_id: string;
  value: number
}

class CreateRewardService{
  public async execute({description, user_id, value }:Request) : Promise<Reward>{
    const rewardRepository = getRepository(Reward);

    const reward = rewardRepository.create({
      description,
      user_id,
      value
    });

    await rewardRepository.save(reward);

    return reward;
  }
}

export default CreateRewardService;
