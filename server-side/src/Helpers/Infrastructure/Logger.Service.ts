import { Service } from 'typedi'
import winston from 'winston'

type LogLevel = 'silly' | 'debug' | 'verbose' | 'info' | 'warn' | 'error'

interface LogMethod {
  (level: LogLevel, message: string, meta?: Record<string, any>): void
}

interface LeveledLogMethod {
  (message: string, meta?: Record<string, any> | any): void
}

export interface ILoggerService {
  setup (): void
  log: LogMethod
  silly: LeveledLogMethod
  debug: LeveledLogMethod
  verbose: LeveledLogMethod
  info: LeveledLogMethod
  warn: LeveledLogMethod
  error: LeveledLogMethod
}

let logger: winston.Logger | null = null

@Service()
export class LoggerService implements ILoggerService {
  public constructor () { }

  public setup (): void {
    if (logger !== null) {
      return
    }

    const { combine, timestamp, json } = winston.format
    logger = winston.createLogger({
      level: 'verbose',
      format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        json()
      ),
      transports: []
    })
  }

  public log (level: LogLevel, message: string, meta?: Record<string, any>): void {
    logger?.log(level, message, meta)
  }

  public silly (message: string, meta?: Record<string, any>): void {
    logger?.silly(message, meta)
  }

  public debug (message: string, meta?: Record<string, any>): void {
    logger?.debug(message, meta)
  }

  public verbose (message: string, meta?: Record<string, any>): void {
    logger?.verbose(message, meta)
  }

  public info (message: string, meta?: Record<string, any>): void {
    logger?.info(message, meta)
  }

  public warn (message: string, meta?: Record<string, any>): void {
    logger?.warn(message, meta)
  }

  public error (message: string, meta?: Record<string, any>): void {
    logger?.error(message, meta)
  }
}
