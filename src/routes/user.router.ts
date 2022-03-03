import User from '../types/user.type';
import userModel from '../models/user.model';
import jwt from 'jsonwebtoken';
import config from 'config';
import { Request, Response, Router } from 'express';
import { body, Result, validationResult } from 'express-validator';
import { createUser } from '../services/user.service';
import { HydratedDocument } from 'mongoose';
import { logger } from '../utils/logger';
import authTokenPayload from '../types/token.type';

const usersRouter: Router = Router();

// @route   POST api/users
// @desc    Register a user
// @access  Public
usersRouter.post(
  '/',
  body('name', 'Please add name').notEmpty(),
  body('email', 'Please include a valid email').isEmail(),
  body(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req: Request, res: Response) => {
    const errors: Result = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role }: User = req.body;

    try {
      // check if user already exists, email must be unique
      if (
        await userModel.findOne({
          email,
        })
      ) {
        return res.status(400).json({ msg: 'User already exists' });
      }

      const createdUser: HydratedDocument<User> = await createUser({
        name,
        email,
        password,
        role,
      });

      const payload: authTokenPayload = {
        user: {
          id: createdUser.id,
          role: createdUser.role,
        },
      };

      //sign and send back jwt token
      jwt.sign(
        payload,
        config.get('jwt'),
        { expiresIn: '1h' },
        (err: any, token: string | undefined) => {
          if (err) throw new Error();
          res.json({ token });
        }
      );
    } catch (error) {
      logger.error(error);
      res.status(500).send('Server Error');
    }
  }
);

export default usersRouter;
