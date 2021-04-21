import { Router } from 'express';
import { getRepository } from 'typeorm';

import CreateRewardService from '../services/CreateRewardService';
import Reward from '../models/Reward';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const rewardsRouter = Router();

rewardsRouter.use(ensureAuthenticated);

rewardsRouter.get('/', async (request, response) => {
  const user = request.user.id;
  const rewardRepository = getRepository(Reward);

  const reward = await rewardRepository.find({ where: { user_id: user } });

  return response.json(reward);
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

export default rewardsRouter;
