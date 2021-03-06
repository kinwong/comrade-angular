import { LogSeverityName, fromNameToSeverity, LogSeverity } from './types';

/** Represents supported writer names. */
export type LogWriterName = 'console' | 'string-array';

/** Represents the configuration of a log writer. */
export type LogWriterConfig = {
  /** The minimum severity level to log. */
  minLevel?: LogSeverityName
};

/** Represents the foundation of a log writer. */
export abstract class LogWriter {
  /** Gets the minimum level of severity to write. */
  public readonly minLevel: LogSeverity;

  constructor(config: LogWriterConfig | undefined | null) {
    this.minLevel =  fromNameToSeverity(config?.minLevel, LogSeverity.Debug);
  }
  /**
   * Writes the log.
   * @param severity The severity of the log to write.
   * @param message The message of the log.
   * @param optionalParams Optional parameters to log.
   */
  public abstract write(
    severity: LogSeverity,
    message: string,
    ...optionalParams: any[]
  ): void;
  /**
   * Clears the writer.
   */
  public abstract clear(): void;
}

/**
 * Logs to the browser console.
 */
class ConsoleLogWriter extends LogWriter {
  public static create(config: LogWriterConfig): ConsoleLogWriter {
    return new ConsoleLogWriter(config);
  }
  private constructor(config: LogWriterConfig) {
    super(config);
  }
  /** @inheritdoc */
  public write(
    severity: LogSeverity,
    message: string,
    ...optionalParams: any[]
  ): void {
    if (severity < this.minLevel) { return; }

    switch (severity) {
      case LogSeverity.Info:
        // tslint:disable-next-line: no-console
        console.info(message, ...optionalParams);
        break;

      case LogSeverity.Warn:
        console.warn(message, ...optionalParams);
        break;

      case LogSeverity.Error:
        console.error(message, ...optionalParams);
        break;

      case LogSeverity.Debug:
      default:
      // tslint:disable-next-line: no-console
      console.debug(message, ...optionalParams);
      break;
    }
  }
  /** @inheritdoc */
  clear(): void {
  }
}

/**
 * Writes logs as an array of strings.
 */
export class StringArrayLogWriter extends LogWriter {
  public lines: string[] = [];
  private constructor(config: LogWriterConfig) {
    super(config);
  }
  public static create(config: LogWriterConfig): StringArrayLogWriter {
    return new StringArrayLogWriter(config);
  }
  /** @inheritdoc */
  public write(severity: LogSeverity, message: string, ...optionalParams: any[]): void {
    if (severity < this.minLevel) { return; }
    let line = '[' + LogSeverity[severity].toUpperCase() + ']';
    if (message) {
      line += ':' + message;
    }
    const args = optionalParams[0][0];
    if (args && args.length > 0) {
      line += '-' + JSON.stringify(args);
    }
    this.lines.push(line);
  }
  /** @inheritdoc */
  clear(): void {
    this.lines = [];
  }
}

/**
 * Creates a log writer from the specified log writer name and configuration.
 * @param details Details include name and configuration of the log writer.
 */
export function createLogWriter(details: {
  name: LogWriterName, config: LogWriterConfig}): LogWriter {
    switch (details.name) {
      case 'console': return ConsoleLogWriter.create(details.config);
      case 'string-array': return StringArrayLogWriter.create(details.config);
      default:
        throw new Error(`Unable to create log-writer with name '${details.name}'.`);
    }
}
