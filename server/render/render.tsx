import React from 'react'
import { Request, Response } from 'express'
import fs from 'fs'
import path from 'path'
import { Provider } from 'react-redux'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { store } from '../../src/store/store'

require('@babel/register')(
  {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: [
      [
        'transform-assets',
        {
          extensions: [
            'css',
            'svg'
          ],
          name: '[name].[ext]'
        }
      ]
    ]
  }
)

const { App } = require('../../src/ssr')

export const render = (req: Request, res: Response) => {
  const indexHtml = fs.readFileSync(path.resolve(__dirname, '../../../www/index.html'), { encoding: 'utf-8' })

  const reactHtml = ReactDOMServer.renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </Provider>
  )

  const result = indexHtml.replace(
    '<div id="root"></div>',
    `
    <div id="root">${reactHtml}</div>
    <script src="main.js"></script>
    `
  )

  res.send(result)
}
