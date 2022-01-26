import express, { Express } from 'express';
import morgan from 'morgan';
import { userRouter } from './routes/user.router';
import { swaggerRouter } from './routes/swagger.route';

const app: Express = express();

//middleware
app.use(express.json());
app.use(morgan('dev'));

//routers
app.use(userRouter);
app.use(swaggerRouter);

//server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
