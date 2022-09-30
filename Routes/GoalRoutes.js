import express from 'express';
import {
  createGoals,
  deleteGoals,
  Goals,
  updateGoals,
} from '../Controllers/Goalcontrollers.js';
import { protect } from '../middleware/Authmiddleware.js';

const GoalRouter = express.Router();
GoalRouter.route('/goals').get(protect, Goals).post(protect, createGoals);
GoalRouter.route('/:id').put(protect, updateGoals).delete(protect, deleteGoals);

export default GoalRouter;
