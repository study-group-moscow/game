import express, {Request, Response} from 'express';
const cors = require('cors');
const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');
const PORT = process.env.PORT || 8989;

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    res.send('hello');
});

app.use('/user', userRouter);
app.use('/post', postRouter);

app.listen(PORT, () => {
    console.log(`app run on port ${PORT}`);
});
