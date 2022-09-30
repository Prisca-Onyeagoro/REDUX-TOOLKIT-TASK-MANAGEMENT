import asyncHandler from 'express-async-handler';
import Goal from '../model/Goalmodel.js';
import User from '../model/Usermodel.js';

export const createGoals = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400);
    throw new Error('error');
  }

  const goal = await Goal.create({ text, user: req.user.id });

  res.status(201).json(goal);
});

export const Goals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id });
  res.status(200).json(goals);
});
export const updateGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not Authorized');
  }
  const Updatedgoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(Updatedgoal);
});
export const deleteGoals = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error('Goal not found');
  }
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }
  if (goal.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not Authorized');
  }
  await goal.remove();
  res.status(200).json({ id: req.params.id });
});
