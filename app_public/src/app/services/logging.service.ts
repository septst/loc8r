import { Injectable } from '@angular/core';
import { NGXLogger, NgxLoggerLevel } from 'ngx-logger';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  constructor(
    private logger: NGXLogger
  ) {
    this.setDefaultConfig();
  }

  private apiBaseUrl = environment.apiBaseUrl;
  private url = `${this.apiBaseUrl}/log`;

  setDefaultConfig(): void {
    const defaultConfig = this.logger.getConfigSnapshot();
    //set current level as Info
    defaultConfig.level = NgxLoggerLevel.INFO;
    defaultConfig.serverLogLevel = NgxLoggerLevel.INFO;
    //set server log api url
    defaultConfig.serverLoggingUrl = this.url;
    this.logger.updateConfig(defaultConfig);
  }

  getCurrentLogConfig(): any {
    const currentConfig = this.logger.getConfigSnapshot();
    return {
      "level": this.logger.level,
      "serverLoggingUrl": currentConfig.serverLoggingUrl
    };
  }

  changeLogLevel(newLevel: NgxLoggerLevel) {
    const currentConfig = this.logger.getConfigSnapshot();
    const previousLevel = currentConfig.level;
    currentConfig.level = newLevel;
    currentConfig.serverLogLevel = newLevel;
    this.logger.updateConfig(currentConfig);
    this.logger.info(
      `The log level is changed from ${NgxLoggerLevel[previousLevel]} to ${NgxLoggerLevel[newLevel]}`);
  }

  disableFileDetails(disable: boolean) {
    const currentConfig = this.logger.getConfigSnapshot();
    currentConfig.disableFileDetails = disable;
    this.logger.updateConfig(currentConfig);
  }

  serverLogging(enabled: boolean) {
    const currentConfig = this.logger.getConfigSnapshot();
    currentConfig.serverLoggingUrl = enabled ? this.url : '';
    this.logger.updateConfig(currentConfig);
  }

  info(message: string) {
    this.logger.info(message);
  }

  error(errorMessage: string) {
    this.logger.error(errorMessage);
  }
}
