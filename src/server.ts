import express, { Express } from 'express';
import morgan from 'morgan';
import { connectDB } from '../config/db';
import { logger } from './utils/logger';
import {
  userRouter,
  authRouter,
  itemsRouter,
  ordersRouter,
  swaggerRouter,
} from './routes';

const app: Express = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));

//routers
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/items', itemsRouter);
app.use('/api/orders', ordersRouter);
app.use('/docs', swaggerRouter);

//server setup
const PORT: string | number = process.env.PORT || 5000;
app.listen(PORT, async () => {
  logger.info(`Server started at http://localhost:${PORT}`);
  logger.info(`OpenAPI docs avaiable at http://localhost:${PORT}/docs`);
  //connect to mongo
  await connectDB();
});
