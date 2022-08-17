import express from 'express';
import path from 'path';
import 'dotenv/config';
import cors from 'cors';
import morgan from 'morgan';
import userRouter from './routes/user.routes';
import postRouter from './routes/post.routes';
import { render } from './render/render'

const { HOST, FRONT_BACK_PORT } = process.env;

const app = express();

const corsOptions = {
  origin: [`http://${HOST}:${FRONT_BACK_PORT}`],
  credentials: true
}
const logger = morgan('combined');
app.use(logger)
app.use(cors(corsOptions))
app.use(express.json())

app.use('/user', userRouter);
app.use('/post', postRouter);

app.use(express.static(path.resolve(__dirname, '../../public')))
app.use(render) // ssr

app.listen(FRONT_BACK_PORT, () => {
  console.log(`app run on port ${FRONT_BACK_PORT}`);
});
