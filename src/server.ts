import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';

const app: Application = express();

app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  res.send('Hello');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
