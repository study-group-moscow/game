import express, { Request, Response } from 'express';
import path from 'path';
import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/user.routes';
import postRouter from './routes/post.routes';
import { render } from './render/render'

const { PORT } = process.env;

const app = express();

const corsOptions = {
  origin: ['http://localhost:5000'],
  credentials: true
}
const logger = morgan('combined');
app.use(express.static(path.resolve(__dirname, '../../public')))
app.use(render) // ssr
app.use(logger)
app.use(cors(corsOptions))
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
  res.send('hello');
});

app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(PORT, () => {
  console.log(`app run on port ${PORT}`);
});
