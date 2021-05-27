import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { StorageService } from '../storage.service';
import { ThemingService } from '../theming.service';
import { NgxLoggerLevel, NGXLogger } from 'ngx-logger';

import { LogEvent } from '../log-event';
import { User } from '../user';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FrameworkComponent implements OnInit {

  public themes: string[];
  public darkModeOn: boolean = true;
  public themingSubscription: Subscription;
  private darkModeKey: string = "dark-mode";

  constructor(
    private authService: AuthService,
    private themingService: ThemingService,
    private storageService: StorageService,
    private overlayContainer: OverlayContainer,
    private logger: NGXLogger) { }

  @HostBinding('class') public cssClass: string;

  ngOnInit(): void {
    this.themes = this.themingService.themes;
    this.applyDefaultTheme();
    this.themingSubscription = this.themingService.theme.subscribe((theme: string) => {
      this.darkModeOn = theme.includes("dark");
      console.log(`Dark mode ${this.darkModeOn ? 'enabled' : 'disabled'}`);
      this.storageService.setItemByKey(this.darkModeKey, this.darkModeOn ? "enabled" : "");
      this.cssClass = theme;
      this.applyThemeOnOverlays();
    });
  }

  ngOnDestroy() {
    this.themingSubscription.unsubscribe();
  }

  private applyDefaultTheme() {
    console.log("Applying theme selection");
    if (this.storageService.getItemByKey(this.darkModeKey)) {
      this.themingService.theme.next("dark-theme");
    } else {
      this.themingService.theme.next("light-theme");
    }
  }

  private applyThemeOnOverlays() {
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(this.themingService.themes);
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(this.cssClass);
  }

  changeTheme(theme: string) {
    this.themingService.theme.next(theme);
  }

  public doLogout(): void {
    this.authService.logout();
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public getCurrentUserName(): string {
    const user: User = this.authService.getCurrentUser();
    return user.name || "Guest";
  }

  //logging methods
  /**
   * Updates the logger config to the new log level
   * @param newLevel
   */
  handleLogLevelChange(newLevel: NgxLoggerLevel) {
    const updatedConfig = this.logger.getConfigSnapshot();
    updatedConfig.level = newLevel;
    updatedConfig.serverLogLevel = newLevel;
    this.logger.updateConfig(updatedConfig);
  }

  /**
   * Logs the user input using NGXLogger
   * @param log
   */
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
