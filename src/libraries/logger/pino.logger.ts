import { pino, Logger as PinoLoggerImpl } from 'pino'
import { LOG_LEVELS, Logger } from './definition'

export default class PinoLogger implements Logger {
  readonly _logger: PinoLoggerImpl

  constructor(
    private level: LOG_LEVELS,
    private prettyPrintEnabled: boolean
  ) {
    this._logger = pino({
      level,
      transport: prettyPrintEnabled
        ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            sync: true,
          },
        }
        : undefined,
    })
  }

  debug(message: string, metadata?: object): void {
    if (metadata) {
      this._logger.debug(metadata, message)
    } else {
      this._logger.debug(message)
    }
  }

  error(message: string, metadata?: object): void {
    if (metadata) {
      this._logger.error(metadata, message)
    } else {
      this._logger.error(message)
    }
  }

  info(message: string, metadata?: object): void {
    if (metadata) {
      this._logger.info(metadata, message)
    } else {
      this._logger.info(message)
    }
  }

  warning(message: string, metadata?: object): void {
    if (metadata) {
      this._logger.warn(metadata, message)
    } else {
      this._logger.warn(message)
    }
  }
}
