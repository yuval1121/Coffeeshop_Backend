import { Router, Request, Response } from 'express';

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

userRouter.post('/', async (req: Request, res: Response) => {
  res.send('hello from user');
});

export default userRouter;
