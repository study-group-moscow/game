import express, { Request, Response } from 'express';
import helmet from 'helmet';
import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/user.routes';
import postRouter from './routes/post.routes';

const { PORT } = process.env;

const app = express();

const corsOptions = {
  origin: ['http://localhost:5000'],
  credentials: true
}
const logger = morgan('combined');
app.use(logger);
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: false,
    directives: {
      'default-src': helmet.contentSecurityPolicy.dangerouslyDisableDefaultSrc,
      'script-src': ["'self'"]
    }
  })
);
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
