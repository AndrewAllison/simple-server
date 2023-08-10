import { NextFunction, Response, Request } from 'express'
import { logger } from './index'

const loggingMiddleware = (req: Request, res: Response, next: NextFunction) => {
  logger.info(
    `[Request] [${req.method}] (${req.headers['x-request-id']}): ${req.url}`,
  )
  logger.debug(
    `[Request] [${req.method}] (${req.headers['x-request-id']}): ${req.url}`,
    req.body,
  )
  const send = res.send
  res.send = (content) => {
    console.log(content)
    // logger.debug(
    // 	`[Response] [${res.statusCode}] (${req.headers['x-request-id']}): ${req.url}`,
    // 	JSON.parse(content),
    // )
    res.send = send
    return res.send(content)
  }
  res.on('finish', () => {
    logger.info(
      `[Response] [${res.statusCode}] (${req.headers['x-request-id']}): ${req.url}`,
    )
  })
  next()
}

export { loggingMiddleware }
