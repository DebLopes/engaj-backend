import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import User from '../models/User';
import Reward from '../models/Reward';

interface Request {
  id: string;
  userId: string;
}

class UpdateBalanceService {
  public async execute({ id, userId }: Request): Promise<User> {
    const rewardRepository = getRepository(Reward);
    const userRepository = getRepository(User);

    const reward = await rewardRepository.findOne(id);
    const user = await userRepository.findOne({ id: userId });

    if (!reward) {
      throw new AppError('Reward does not exist');
    }

    if (!user) {
      throw new AppError('User does not exist');
    }

    if (reward.id === userId) {
      throw new AppError('Reward does not exist for this user');
    }

    if (user.balance < reward.value) {
      throw new AppError('User does not have enough balance');
    }

    user.balance -= reward.value;
    await userRepository.save(user);

    return user;
  }
}
export default UpdateBalanceService;
