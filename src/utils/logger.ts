/* eslint-disable no-console */
type ValidArguments = (string | unknown)[];

enum Severity {
  LOG = "log",
  INFO = "info",
  WARN = "warn",
  ERROR = "error",
}

export class Logger {
  protected static _log(severity: Severity, args: ValidArguments): void {
    const logDate = `${new Date().toISOString()} [${severity.toUpperCase()}]`;

    if (severity === Severity.ERROR) {
      console.error(logDate, ...args);
    } else {
      console.info(logDate, ...args);
    }
  }

  static debug(...args: ValidArguments): void {
    this._log(Severity.LOG, args);
  }

  static info(...args: ValidArguments): void {
    this._log(Severity.INFO, args);
  }

  static log(...args: ValidArguments): void {
    this._log(Severity.LOG, args);
  }

  static warn(...args: ValidArguments): void {
    this._log(Severity.WARN, args);
  }

  static warning(...args: ValidArguments): void {
    this._log(Severity.WARN, args);
  }

  static error(...args: ValidArguments): void {
    this._log(Severity.ERROR, args);
  }
}
