import express from 'express';
import path from 'path';
import { render } from './render/render';

const app = express();

app.use(express.static(path.resolve(__dirname, '../../../public')))

app.use(render)

app.listen(7070, () => console.log('Сервер стартовал на 7070 порту'));
