import express, {
  Express,
  Request as ExRequest,
  Response as ExResponse,
} from 'express'
import helmet from 'helmet'
import cors from 'cors'
import { logger, loggingMiddleware } from './libraries/logger'
import { addRequestId } from './libraries/request-id/express/middleware'
import Context from './libraries/context'
import limiter from './libraries/rate-limit/rate-limiter'
import { RegisterRoutes } from '../config/routes'
import swaggerUi from 'swagger-ui-express'
import { errorHandler } from './libraries/error-handling/error-handler'
import cookieParser from 'cookie-parser'

async function createExpressApp(): Promise<Express> {
  logger.configureLogger({
    level: 'debug',
    prettyPrint: true,
  })
  const app: Express = express()

  // Observability
  app.use(addRequestId)

  // eslint-disable-next-line
  app.use((req: ExRequest, res: unknown, next: any) => {
    Context.bind(req)
    next()
  })

  // Security
  app.use(cors())
  app.use(
    helmet({
      hidePoweredBy: true,
    }),
  )
  app.use(limiter)
  app.use(cookieParser())

  // General Config
  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  // Controller registration via TSOA
  RegisterRoutes(app)

  // Swagger and Docs
  app.use(
    '/docs',
    swaggerUi.serve,
    async (_req: ExRequest, res: ExResponse) => {
      return res.send(
        swaggerUi.generateHTML(await import('../config/swagger.json')),
      )
    },
  )

  app.use(errorHandler)
  app.use(loggingMiddleware)

  return app
}

export { createExpressApp }
