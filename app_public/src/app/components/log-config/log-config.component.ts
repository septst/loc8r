import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { NgxLoggerLevel } from 'ngx-logger';
import { LoggingService } from 'src/app/services/logging.service';

@Component({
  selector: 'app-log-config',
  templateUrl: './log-config.component.html',
  styleUrls: ['./log-config.component.css']
})

export class LogConfigComponent {

  constructor(
    private loggingService: LoggingService
  ) { }

  ngOnInit(): void {
    this.getCurrentLogLevel();
  }

  public currentLogLevel: NgxLoggerLevel;
  public NgxLoggerLevel = NgxLoggerLevel;
  public enableServerLogging: boolean;

  get loggerColor(): string {
    switch (this.currentLogLevel) {
      case NgxLoggerLevel.INFO:
        return 'accent';
      case NgxLoggerLevel.ERROR:
        return 'warn';
      default:
        return '';
    }
  }

  changeLogLevel(newLevel: NgxLoggerLevel) {
    this.currentLogLevel = newLevel;
    this.loggingService.changeLogLevel(newLevel);
  }

  disableFileDetailsChange(change: MatSlideToggleChange) {
    this.loggingService.disableFileDetails(change.checked);
  }

  serverLoggingChange(change: MatSlideToggleChange) {
    this.loggingService.serverLogging(change.checked);
  }

  getCurrentLogLevel() {
    const currentLogConfig = this.loggingService.getCurrentLogConfig();
    this.currentLogLevel = currentLogConfig.level ? currentLogConfig.level : NgxLoggerLevel.INFO;
    this.enableServerLogging = (currentLogConfig.serverLoggingUrl !== undefined);
  }
}
