/** Represents levels of log severity. */
export enum LogSeverity {
  /** Indicates an invalid severity. */
  None,
  /** Indicates the severity of the log is at the debug level. */
  Debug,
  /** Indicates the severity of the log is at the information level. */
  Info,
  /** Indicates the severity of the log is at the warning level. */
  Warn,
  /** Indicates the severity of the log is at the error level. */
  Error,
}
/** Represents names of severity. */
export type LogSeverityName = 'debug' | 'info' | 'warn' | 'error';

/**
 * Converts from severity name to severity level.
 * @param severityName The name of the severity or undefined.
 * @param defaultSeverity The severity level to return if unable to parse.
 * @returns The severity level matches the specified severity name.
 */
export function fromNameToSeverity(
  severityName: LogSeverityName | undefined,
  defaultSeverity: LogSeverity): LogSeverity {
  if (!severityName) { return defaultSeverity; }
  switch (severityName) {
    case 'debug':
      return LogSeverity.Debug;
    case 'info':
      return LogSeverity.Info;
    case 'warn':
      return LogSeverity.Warn;
    case 'error':
      return LogSeverity.Error;
    default:
      return defaultSeverity;
  }
}

/**
 * Converts from severity level to severity name.
 * @param severity The severity level to convert.
 */
export function fromSeverityToName(
  severity: LogSeverity): LogSeverityName {
  switch (severity) {
    case LogSeverity.Info:
      return 'info';
    case LogSeverity.Warn:
      return 'warn';
    case LogSeverity.Error:
      return 'error';
    case LogSeverity.Debug:
    default:
      return 'debug';
  }
}
