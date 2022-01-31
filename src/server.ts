import express, { Express } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import { connectDB } from '../config/db';
import { logger } from './utils/logger';
import { userRouter, swaggerRouter } from './routes';

const app: Express = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));

//routers
app.use(swaggerRouter);
app.use(userRouter);

//server setup
const PORT: string | number = process.env.PORT || 5000;
app.listen(PORT, async () => {
  logger.info(`Server started at http://localhost:${PORT}`);
  logger.info(`Swagger webpage available at http://localhost:${PORT}/docs`);
  //connect to mongo
  await connectDB();
});
