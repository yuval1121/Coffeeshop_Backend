import { Router } from 'express';

const userRouter: Router = Router();

/**
 * @swagger
 * /:
 *   get:
 *     description: Get all Employee by Email
 *     responses:
 *       200:
 *         description: Success
 *
 */

userRouter.get('/', (req, res) => res.send('hello from user'));

export { userRouter };
