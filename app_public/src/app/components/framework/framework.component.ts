import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { ThemingService } from '../../services/theming.service';

import { User } from '../../models/user';
import { QuickMessageService } from 'src/app/services/quick-message.service';

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
    private quickMessageService: QuickMessageService,
    private overlayContainer: OverlayContainer) { }

  @HostBinding('class') public cssClass: string;

  ngOnInit(): void {
    this.themes = this.themingService.themes;
    this.applyDefaultTheme();
    this.themingSubscription = this.themingService.theme.subscribe((theme: string) => {
      this.darkModeOn = theme.includes("dark");
      console.log(`Dark mode ${this.darkModeOn ? 'enabled' : 'disabled'}`);
      this.storageService.setItemByKey(this.darkModeKey, this.darkModeOn ? "enabled" : "");
      this.cssClass = theme;
      this.applyThemeOnOverlays(theme);
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
    this.quickMessageService.push(`Logout successful.`)
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public getCurrentUserName(): string {
    const user: User = this.authService.getCurrentUser();
    return user.name || "Guest";
  }
}
