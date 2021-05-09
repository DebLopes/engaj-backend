import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateRewardService from '../services/CreateRewardService';
import UpdateBalanceService from '../services/UpdateBalanceService';
import Reward from '../models/Reward';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const rewardsRouter = Router();

rewardsRouter.use(ensureAuthenticated);

rewardsRouter.get('/', async (request, response) => {
  const user = request.user.id;
  const rewardRepository = getRepository(Reward);

  const rewards = await rewardRepository.find({ where: { user_id: user } });

  return response.json(rewards);
})

rewardsRouter.post('/', async (request, response) => {
  const user = request.user.id;
  const { description, value } = request.body;

  const createRewardService = new CreateRewardService();

  const reward = await createRewardService.execute({
    description,
    user_id: user,
    value
  });

  return response.json(reward);
});

rewardsRouter.patch('/:id', async (request, response) => {
  const userId = request.user.id;
  const { id } = request.params;

  const updateBalance = new UpdateBalanceService();

 const user = await updateBalance.execute({id, userId});

  const userWithoutPassword = {
    id: user.id,
    name: user.name,
    email: user.email,
    balance: user.balance,
    created_at: user.created_at,
    updated_at: user.updated_at,
  };

  return response.json(userWithoutPassword);

});

export default rewardsRouter;
