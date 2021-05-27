import { Component, Output, EventEmitter } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { NgxLoggerLevel } from 'ngx-logger';

@Component({
  selector: 'app-log-config',
  templateUrl: './log-config.component.html',
  styleUrls: ['./log-config.component.css']
})

export class LogConfigComponent {
  @Output()
  loggerLevelChange: EventEmitter<NgxLoggerLevel> = new EventEmitter();
  public currentLogLevel: NgxLoggerLevel = NgxLoggerLevel.DEBUG;

  NgxLoggerLevel = NgxLoggerLevel;

  @Output()
  disableFileDetails: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  serverLogging: EventEmitter<boolean> = new EventEmitter<boolean>();

  get loggerColor(): string {
    switch (this.currentLogLevel) {
      case NgxLoggerLevel.TRACE:
      case NgxLoggerLevel.DEBUG:
        return 'primary';

      case NgxLoggerLevel.INFO:
      case NgxLoggerLevel.LOG:
        return 'accent';

      case NgxLoggerLevel.WARN:
      case NgxLoggerLevel.ERROR:
      case NgxLoggerLevel.FATAL:
        return 'warn';

      default:
        return '';
    }
  }

  handleButtonClick(newLevel: NgxLoggerLevel) {
    this.currentLogLevel = newLevel;
    this.loggerLevelChange.emit(this.currentLogLevel);
  }

  disableFileDetailsChange(change: MatSlideToggleChange) {    
    this.disableFileDetails.emit(change.checked);
  }

  serverLoggingChange(change: MatSlideToggleChange) {
    this.serverLogging.emit(change.checked);
  }
}
