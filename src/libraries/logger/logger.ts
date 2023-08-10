import { Logger, LoggerConfiguration } from './definition'
import PinoLogger from './pino.logger'
import { context } from '../request-id'

class LoggerWrapper implements Logger {
  logger: Logger | null = null

  _getInitializeLogger(): Logger {
    this.configureLogger({})
    return this.logger!
  }

  configureLogger(
    configuration: Partial<LoggerConfiguration>
  ): void {
    if (this.logger === null) {
      this.logger = new PinoLogger(
        configuration.level || 'info',
        configuration.prettyPrint || true
      )
    }
  }

  resetLogger() {
    this.logger = null
  }

  debug(message: string, metadata?: object): void {
    this._getInitializeLogger().debug(
      message,
      LoggerWrapper._insertContextIntoMetadata(metadata)
    )
  }

  error(message: string, metadata?: object): void {
    this._getInitializeLogger().error(
      message,
      LoggerWrapper._insertContextIntoMetadata(metadata)
    )
  }

  info(message: string, metadata?: object): void {
    // If never initialized, the set default configuration
    this._getInitializeLogger().info(
      message,
      LoggerWrapper._insertContextIntoMetadata(metadata)
    )
  }

  warning(message: string, metadata?: object): void {
    this._getInitializeLogger().warning(
      message,
      LoggerWrapper._insertContextIntoMetadata(metadata)
    )
  }

  static _insertContextIntoMetadata(metadata?: object): object | undefined {
    const currentContext = context().getStore()

    // Doing this to avoid merging objects...
    if (currentContext == null) {
      return metadata
    }

    if (metadata == null) {
      return currentContext
    }

    // Metadata would override the current context
    return { ...currentContext, ...metadata }
  }

}

export { LoggerWrapper }
