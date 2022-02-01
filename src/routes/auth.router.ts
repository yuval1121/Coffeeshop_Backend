import { Router, Request, Response } from 'express';
import { HydratedDocument } from 'mongoose';
import { authUser } from '../middleware/auth';
import userModel from '../models/user.model';
import User from '../types/user.type';
import { logger } from '../utils/logger';

const authRouter: Router = Router();

// @route   GET api/auth
// @desc    Get logged in user
// @access  Private
authRouter.get('/', authUser, async (req: Request, res: Response) => {
  try {
    const user: HydratedDocument<User> | null = await userModel
      .findById(res.locals.user.id)
      .select('-password');
    res.json(user);
  } catch (err) {
    logger.error(err);
    res.status(500).send('Server Error');
  }
});

export default authRouter;
