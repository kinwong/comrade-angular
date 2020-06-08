import { Injectable } from '@angular/core';
import { LogSeverity } from './types';
import { LogWriterConfig, LogWriterName } from './log-writers';

export * from './types';
/** Represents the foundation of a logger. */
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

/** Represents the configuration of the log service. */
export interface LogConfig {
  /** An array of log writer name and configuration. */
  writers: [LogWriterName, LogWriterConfig][];
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

