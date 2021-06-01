import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService } from '../../services/data.service';
import { GeolocationService } from '../../services/geolocation.service';
import { Location } from '../../models/location';
import { LoggingService } from 'src/app/services/logging.service';
import { ProgressBarService } from 'src/app/services/progress-bar.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  @Input() locations: Location[];

  constructor(
    private loggingService: LoggingService,
    private dataService: DataService,
    private progessbarService: ProgressBarService) { }

  public message: string = "";

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.progessbarService.show.next(false);
  }
}
