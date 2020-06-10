import * as _ from 'lodash';
import { Injectable } from '@angular/core';
import { LogSeverity } from './types';
import { LogWriterConfig, LogWriterName, LogWriter, createLogWriter } from './log-writers';

export interface LogFunc {
  callback: (message: string, ...args: string[]) => string; // function property
}

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
   * @param message A optional message to log.
   * @param optionalParams An optional variable list of parameters.
   */
  public abstract log(
    severity: LogSeverity,
    message: string | undefined,
    ...optionalParams: any[]
  ): void;

  public error(message: string, ...optionalParams: any[]): void {
    if (!this.enabled(LogSeverity.Error)) {
      return;
    }
    this.log(LogSeverity.Error, message, optionalParams);
  }
  public warn(message: string, ...optionalParams: any[]): void {
    if (!this.enabled(LogSeverity.Warn)) {
      return;
    }
    this.log(LogSeverity.Warn, message, optionalParams);
  }
  public info(message: string, ...optionalParams: any[]): void {
    if (!this.enabled(LogSeverity.Info)) {
      return;
    }
    this.log(LogSeverity.Info, message, optionalParams);
  }
  public debug(message: string, ...optionalParams: any[]): void {
    if (!this.enabled(LogSeverity.Debug)) {
      return;
    }
    this.log(LogSeverity.Debug, message, optionalParams);
  }
}

/** Represents the configuration of the log service. */
export class LogConfig {
  /** An array of log writer name and configuration. */
  writers: { name: LogWriterName, config: LogWriterConfig }[];
}

/**
 * Provides logging service.
 */
@Injectable({
  providedIn: 'root',
})
export class LogService extends Logger {
  constructor(config: LogConfig) {
    super();
    this.writers = LogService.buildWriters(config);
  }
  /** Gets the log writers associates with this log service. */
  public readonly writers: LogWriter[];
  private static buildWriters(config: LogConfig): LogWriter[] {
    return _.toArray(config?.writers.map(createLogWriter));
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
  public log(severity: LogSeverity, message: string, ...optionalParams: any[]): void {
    for (const writer of this.writers) {
      try {
        writer.write(severity, message, optionalParams);
      }
      catch (error) {
        console.error(`Error caught while writing log with '${error.name}'.`, error);
      }
    }
  }
  /**
   * Creates a logger for the specified namespace.
   * @param namespace The namespace of the newly created logger.
   */
  public create(namespace: string): Logger {
    return null;
  }
}
