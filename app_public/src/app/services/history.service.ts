import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {

  private urls: string[] = [];

  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((routerEvent: any) => routerEvent instanceof NavigationEnd))
      .subscribe((routerEvent: NavigationEnd) => {
        const url = routerEvent.urlAfterRedirects;
        this.urls = [...this.urls, url];
      });
  }

  public getPreviousUrl(): string {
    const length = this.urls.length;
    return length > 1 ? this.urls[length - 2] : "/";
  }

  public getPreLoginUrl(): string {
    const excludedUrls = ["/register", "/login"];
    const filtered = this.urls.filter(url => !excludedUrls.includes(url));
    const length = filtered.length;
    return length > 0 ? filtered[length - 1] : "/";
  }

  public getPreRegisterUrl(): string {
    return this.getPreLoginUrl();
  }
}
