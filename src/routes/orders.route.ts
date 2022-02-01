import { Request, Response, Router } from 'express';
import {
  body,
  Result,
  ValidationError,
  validationResult,
} from 'express-validator';
import { HydratedDocument, Types } from 'mongoose';
import { authUser } from '../middleware/auth.mid';
import { createOrder } from '../service/order.service';
import Order from '../types/order.type';
import { logger } from '../utils/logger';

const ordersRouter: Router = Router();

// @route   POST api/orders/makeorder
// @desc    Client makes an order.
// @access  Public - Client
ordersRouter.post(
  '/makeorder',
  authUser,
  body('items').notEmpty(),
  async (req: Request, res: Response) => {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // can use spread instead
    const { items, price }: Order = req.body;
    const client: Types.ObjectId = new Types.ObjectId(res.locals.user.id);
    try {
      const order: HydratedDocument<Order> | null = await createOrder({
        items,
        client,
        price,
      });

      res.json(order);
    } catch (error) {
      logger.error(error);
      res.status(500).send('Server Error');
    }
  }
);
