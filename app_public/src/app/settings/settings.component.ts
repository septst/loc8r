import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NGXLogger, NgxLoggerLevel } from 'ngx-logger';
import { LogEvent } from '../models/log-event';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public loggerForm: FormGroup;

  public logTypes: LoggerSelectionOption[] = [
    { value: NgxLoggerLevel.TRACE, viewValue: 'Trace' },
    { value: NgxLoggerLevel.DEBUG, viewValue: 'Debug' },
    { value: NgxLoggerLevel.INFO, viewValue: 'Info' },
    { value: NgxLoggerLevel.LOG, viewValue: 'Log' },
    { value: NgxLoggerLevel.WARN, viewValue: 'Warn' },
    { value: NgxLoggerLevel.ERROR, viewValue: 'Error' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private logger: NGXLogger) { }

  ngOnInit(): void {
    this.loggerForm = this.formBuilder.group({
      logMessage: ['', Validators.required],
      logType: ['', Validators.required]
    });
  }

  //logging methods
   handleLogLevelChange(newLevel: NgxLoggerLevel) {
    const updatedConfig = this.logger.getConfigSnapshot();
    updatedConfig.level = newLevel;
    updatedConfig.serverLogLevel = newLevel;
    this.logger.updateConfig(updatedConfig);
  }

  handleLog(log: LogEvent) {
    switch (log.logType) {
      case NgxLoggerLevel.TRACE:
        this.logger.trace(log.logMessage);
        break;
      case NgxLoggerLevel.DEBUG:
        this.logger.debug(log.logMessage);
        break;
      case NgxLoggerLevel.INFO:
        this.logger.info(log.logMessage);
        break;
      case NgxLoggerLevel.LOG:
        this.logger.log(log.logMessage);
        break;
      case NgxLoggerLevel.WARN:
        this.logger.warn(log.logMessage);
        break;
      case NgxLoggerLevel.ERROR:
        this.logger.error(log.logMessage);
        break;
      case NgxLoggerLevel.FATAL:
        this.logger.fatal(log.logMessage);
        break;
    }
  }

  handleDisableFileDetails(disableFileDetails: boolean) {
    const updatedConfig = this.logger.getConfigSnapshot();
    updatedConfig.disableFileDetails = disableFileDetails;
    this.logger.updateConfig(updatedConfig);
  }

  serverLogging(enabled: boolean) {
    const updatedConfig = this.logger.getConfigSnapshot();
    updatedConfig.serverLoggingUrl = enabled ? '/dummyURL' : '';
    this.logger.updateConfig(updatedConfig);
  }
}

export interface LoggerSelectionOption {
  value: NgxLoggerLevel;
  viewValue: string;
}
