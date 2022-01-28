import express, { Express } from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import { userRouter } from './routes/user.router';
import { swaggerRouter } from './routes/swagger.route';
import { connectDB } from '../config/db';

const app: Express = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));

//routers
app.use(swaggerRouter);
app.use(userRouter);

//server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  console.log(`Server started on port ${PORT}`);

  // connect to mongo
  await connectDB();
});
