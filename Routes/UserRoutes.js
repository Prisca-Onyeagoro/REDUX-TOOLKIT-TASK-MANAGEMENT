import express from 'express';
import {
  Getme,
  LoginUser,
  RegisterUser,
} from '../Controllers/Usercontroller.js';
import { protect } from '../middleware/Authmiddleware.js';
const UserRouter = express.Router();
UserRouter.route('/').post(RegisterUser);
UserRouter.route('/user').post(LoginUser);
UserRouter.get('/me', protect, Getme);

export default UserRouter;
