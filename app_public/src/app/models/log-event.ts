import { NgxLoggerLevel } from 'ngx-logger';

export interface LogEvent {
  logMessage: string;
  logType: NgxLoggerLevel;
}
