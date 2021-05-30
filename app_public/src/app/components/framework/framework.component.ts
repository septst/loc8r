import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ThemingService } from '../../services/theming.service';

import { User } from '../../models/user';
import { QuickMessageService } from 'src/app/services/quick-message.service';
import { Router } from '@angular/router';
import { HistoryService } from 'src/app/services/history.service';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FrameworkComponent implements OnInit {

  //private members
  public themes: string[];
  public darkModeOn: boolean = true;
  public themingSubscription: Subscription;
  private darkModeKey: string = "dark-mode";

  //public memebers
  public currentUser: User;
  public isLoggedIn: boolean;
  public isAdmin: boolean;

  constructor(
    private authService: AuthService,
    private themingService: ThemingService,
    private storageService: StorageService,
    private quickMessageService: QuickMessageService,
    private historyService: HistoryService,
    private overlayContainer: OverlayContainer,
    private router: Router) { }

  @HostBinding('class') public cssClass: string;

  ngOnInit(): void {
    this.GetCurrentUser();
    this.themes = this.themingService.themes;
    this.applyDefaultTheme();
    this.themingSubscription = this.themingService.theme.subscribe((theme: string) => {
      this.darkModeOn = theme.includes("dark");
      console.log(`Dark mode ${this.darkModeOn ? 'enabled' : 'disabled'}`);
      this.storageService.setItemByKey(this.darkModeKey, this.darkModeOn ? "enabled" : "");
      this.cssClass = theme;
      this.applyThemeOnOverlays(theme);
    });

    window.addEventListener("storage", event => {

      if (event.storageArea == localStorage) {
        if (event.key === 'locator-token') {
          let token = this.authService.getToken();

          //logged out successfully from other tabs
          if (token === null) {
            this.quickMessageService.push("Sign out successful from another tab.");
            this.authService.changes.next(false);
          } else if (event.oldValue === null && event.newValue === token) { //Login in other tabs
            this.quickMessageService.push("Sign in successful from another tab.");
            this.authService.changes.next(true);
          }
          let currentUrl = this.router.url;
          this.router.navigateByUrl(this.historyService.getPreLoginUrl(), { skipLocationChange: true });
        }
      }
    })
  }

  ngOnDestroy() {
    this.themingSubscription.unsubscribe();
  }

  private GetCurrentUser() {
    this.authService.changes.subscribe(
      (status) => {
        this.currentUser = this.authService.getCurrentUser();
        this.isLoggedIn = status;
        this.isAdmin = (this.currentUser?.isAdmin !== undefined && this.currentUser?.isAdmin === true);
      });
  }

  private applyDefaultTheme() {
    console.log("Applying theme selection");
    if (this.storageService.getItemByKey(this.darkModeKey)) {
      this.themingService.theme.next("dark-theme");
    } else {
      this.themingService.theme.next("light-theme");
    }
  }

  private applyThemeOnOverlays(theme: string) {
    const overlayContainerClasses = this.overlayContainer.getContainerElement().classList;
    const themeClassesToRemove = Array.from(this.themingService.themes);
    if (themeClassesToRemove.length) {
      overlayContainerClasses.remove(...themeClassesToRemove);
    }
    overlayContainerClasses.add(theme);
  }

  changeTheme(theme: string) {
    this.themingService.theme.next(theme);
  }

  public doLogout(): void {
    this.authService.logout();
    this.quickMessageService.push(`Sign out successful.`)
    this.authService.changes.next(false);
  }
}
