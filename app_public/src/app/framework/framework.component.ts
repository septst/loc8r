import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../auth.service';
import { HistoryService } from '../history.service';
import { User } from '../user';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FrameworkComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private historyService: HistoryService) { }

  ngOnInit(): void {
  }

  ngOnDestroy() {
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

}
