import {
  NextFunction,
  Request as ExRequest,
  Response as ExResponse,
} from 'express'
import { ValidateError } from '@tsoa/runtime'
import { logger } from '../logger'

export function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction,
): ExResponse | void {
  if (err instanceof ValidateError) {
    logger.info(`Caught Validation Error for ${req.path}:`, err.fields)
    return res.status(422).json({
      message: 'Validation Failed',
      details: err?.fields,
    })
  }
  if (err instanceof Error) {
    logger.error('[SERVER-ERROR]', { error: err })
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }

  next()
}
