import express, {Request, Response} from 'express';
const cors = require('cors');
const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');
const PORT = process.env.PORT || 8989;

const app = express();
const whitelist = [`http://localhost:8080`]
const corsOptions = {
  origin: function (origin: any, callback: any) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
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
