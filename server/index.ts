import express, { Request, Response } from 'express';
import cors from 'cors';
import userRouter from './routes/user.routes';
import postRouter from './routes/post.routes';

const PORT = process.env.PORT || 8989;

const app = express();

const corsOptions = {
  origin: ['http://localhost:5000'],
  credentials: true
}

app.use(cors(corsOptions))
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.send('hello');
});

app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(PORT, () => {
  console.log(`app run on port ${PORT}`);
});
