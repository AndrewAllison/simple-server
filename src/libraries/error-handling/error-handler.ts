import {
  NextFunction,
  Request as ExRequest,
  Response as ExResponse,
} from 'express'
import { ValidateError } from '@tsoa/runtime'
import { logger } from '../logger'
import { AuthError } from '../../app/auth/controllers/auth.controller'

export function errorHandler(
  err: unknown,
  req: ExRequest,
  res: ExResponse,
  next: NextFunction,
): ExResponse | void {
  if (err instanceof ValidateError) {
    logger.info(
      `[VALIDATION-ERROR]: Caught Validation Error for ${req.path}:`,
      err.fields,
    )
    return res.status(422).json({
      message: 'Validation Failed',
      fields: err?.fields,
    })
  }
  if (err instanceof AuthError) {
    logger.info(`[AUTH-ERROR]: Caught Authentication Error for ${req.path}:`)
    return res.status(401).json({
      message: 'Authentication Failed',
    })
  }
  if (err instanceof Error) {
    logger.error('[SERVER-ERROR]', { error: err })
    console.log(err)
    return res.status(500).json({
      message: 'Internal Server Error',
    })
  }

  next()
}
