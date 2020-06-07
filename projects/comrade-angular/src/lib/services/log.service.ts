import { Injectable } from '@angular/core';

export type WriterConfig = {
  logLevel?: LogSeverity
}
export type ConsoleWriterConfig = {
};

export type LogConfig = {
  writers: WriterConfig[];
};

/**
 * Indicates level of log severity.
 */
export enum LogSeverity {
  /** Indicates the severity of the log is at the debug level. */
  Debug,
  /** Indicates the severity of the log is at the information level. */
  Info,
  /** Indicates the severity of the log is at the warning level. */
  Warn,
  /** Indicates the severity of the log is at the error level. */
  Error
}

interface MessageFunc {
  callback: (message: string, ...args: string[]) => string; // function property
}

/**
 * Represents the foundation of a logger.
 */
export abstract class Logger {
  /**
   * Checks whether logging at the specified severity level is enabled.
   * @param severity The severity level to check.
   * @returns True if logging is enabled, false otherwise.
   */
  public abstract enabled(severity: LogSeverity): boolean;
  /**
   * Logs the specified messages.
   * @param severity The servity level of the message.
   * @param message The message to log.
   * @param args The arguments.
   */
  public abstract log(
    severity: LogSeverity,
    message: string,
    ...args: object[]
  ): void;

 public error(error: Error): void {
    if (!this.enabled(LogSeverity.Error)) {
      return;
    }
    this.log(LogSeverity.Error, error.message);
  }
  public warn(message: string, error: Error): void {
    if (!this.enabled(LogSeverity.Warn)) {
      return;
    }
    this.log(LogSeverity.Warn, message);
  }
  public info(message: string): void {
    if (!this.enabled(LogSeverity.Info)) {
      return;
    }
    this.log(LogSeverity.Info, message);
  }
  public debug(message: string): void {
    if (!this.enabled(LogSeverity.Debug)) {
      return;
    }
    this.log(LogSeverity.Info, message);
  }
}

/**
 * Provides logging service.
 */
@Injectable({
  providedIn: 'root',
})
export class LogService extends Logger {
  constructor() {
    super();
  }
  /**
   * @inheritdoc
   */
  public enabled(severity: LogSeverity): boolean {
    return true;
  }
  /**
   * @inheritdoc
   */
  public log(severity: LogSeverity, message: string, ...args: object[]): void {
    throw new Error('Method not implemented.');
  }
  /**
   * Creates a logger for the specified namespace.
   * @param namespace The namespace of the newly created logger.
   */
  public create(namespace: string): Logger {
    return null;
  }
}

/**
 * Represents the foundation of a log writer.
 */
type LogWriter = {
  /**
   * Writes the log.
   * @param severity The severity of the log to write.
   * @param message The message of the log.
   * @param optionalParams Optional parameters that are passed to util.format().
   */
  write(
    severity: LogSeverity,
    message: string,
    ...optionalParams: any[]
  ): void;
};

/**
 * Logs to the browser console.
 */
class ConsoleLogWriter implements LogWriter {
  /**
   * @inheritdoc
   */
  public write(
    severity: LogSeverity,
    message: string,
    ...optionalParams: any[]
  ): void {
    switch (severity) {
      case LogSeverity.Info:
        // tslint:disable-next-line: no-console
        console.info(message, optionalParams);
        break;

      case LogSeverity.Warn:
        console.warn(message, optionalParams);
        break;

      case LogSeverity.Error:
        console.error(message, optionalParams);
        break;

      case LogSeverity.Debug:
      default:
      // tslint:disable-next-line: no-console
      console.debug(message, optionalParams);
      break;
      }
  }
}
