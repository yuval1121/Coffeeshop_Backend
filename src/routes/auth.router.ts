import { Router, Request, Response } from 'express';
import {
  body,
  Result,
  ValidationError,
  validationResult,
} from 'express-validator';
import { HydratedDocument } from 'mongoose';
import { authUser } from '../middleware/auth';
import userModel from '../models/user.model';
import User from '../types/user.type';
import { logger } from '../utils/logger';
import jwt from 'jsonwebtoken';
import { validatePassword } from '../service/user.sevice';
import authTokenPayload from '../types/token.type';
import config from 'config';

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

// @route   POST api/auth
// @desc    Auth user and get token
// @access  Public

authRouter.post(
  '/',
  body('email', 'Please include a valid email').isEmail(),
  body('password', 'Password is required').exists(),
  async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password }: { email: string; password: string } = req.body;

    try {
      const user: HydratedDocument<User> | null = await userModel.findOne({
        email,
      });

      if (!user) {
        return res.status(400).send('Invalid credentials');
      }

      const isMatch: boolean = await validatePassword(password, user.password);

      if (!isMatch) {
        return res.status(400).send('Invalid credentials');
      }

      const payload: authTokenPayload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      jwt.sign(
        payload,
        config.get('jwt'),
        { expiresIn: '1h' },
        (err: Error | null, token: string | undefined) => {
          if (err) throw new Error();
          res.json({ token });
        }
      );
    } catch (error) {
      logger.error(error);
      logger.error('Server Error');
    }
  }
);

export default authRouter;
