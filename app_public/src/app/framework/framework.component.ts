import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from '../loader.service';

@Component({
  selector: 'app-framework',
  templateUrl: './framework.component.html',
  styleUrls: ['./framework.component.css']
})
export class FrameworkComponent implements OnInit {

  public showLoader: boolean;
  private subscription: Subscription;
  constructor(private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.loaderService.status.subscribe((status: boolean) => {
      this.showLoader = status;
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
