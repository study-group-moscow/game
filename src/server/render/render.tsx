import React from 'react';
import { Request, Response } from 'express';
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server';
import fs from 'fs';
import path from 'path';
import { App } from '../../client/ssr';

export const render = (req: Request, res: Response) => {
  // Читаем index.html
  const indexHTML = fs.readFileSync(path.resolve(__dirname, '../../../../www/index.html'), { encoding: 'utf-8' });

  const reactHtml = ReactDOMServer.renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  // Замена на серверный рендер
  const result = indexHTML.replace(
    '<div id="root"></div>',
    `<div id="root">${reactHtml}</div>
<script src="main.js"></script>
`
  )
  res.send(result);
}
