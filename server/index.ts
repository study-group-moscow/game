import express, {Request, Response} from 'express';
import cors from 'cors';
import userRouter from './routes/user.routes';
import postRouter from './routes/post.routes';
const PORT = process.env.PORT || 8989;

const app = express();

const whitelist = [`http://localhost:5000`];
const corsOptions = {
  origin: function (origin: string, callback: (obj: Error | null, bool?: boolean) => void) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}
// @ts-ignore
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
