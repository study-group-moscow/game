import React from 'react'
import { Request, Response } from 'express'
import ReactDOMServer from 'react-dom/server'
import { App } from '../../src/ssr'

export const render = (req: Request, res: Response) => {
  const reactHtml = ReactDOMServer.renderToString(<App />)

  res.send(reactHtml)
}
