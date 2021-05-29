import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService } from '../../services/data.service';
import { GeolocationService } from '../../services/geolocation.service';
import { Location } from '../../models/location';
import { LoggingService } from 'src/app/services/logging.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  constructor(
    private loggingService: LoggingService,
    private dataService: DataService,
    private geolocationService: GeolocationService) { }

  public locations$: Observable<Location[]>;

  public message: string = "";

  ngOnInit(): void {
    this.getPosition();
  }

  private getPosition(): void {
    this.message = "Getting your location...";
    this.geolocationService.getPosition(
      this.getLocations.bind(this),
      this.showError.bind(this),
      this.noGeo.bind(this)
    );
  }

  private getLocations(position: any): void {
    this.message = 'Searching for nearby places...';
    const lat: number = position.coords.latitude;
    const lng: number = position.coords.longitude;
    console.log(`The currest position is ${lat}, ${lng}`);

    this.locations$ = this.dataService.getLocations(lat, lng);
  }

  private noGeo(): void {
    this.loggingService.error('Geolocation not supported by this browser.');
    this.message = 'Geolocation not supported by this browser.';
  };

  private showError(error: any): void {
    this.loggingService.error(
      `Error occured in geolocation service. The details are ${error.message}`);
    this.message = error.message;
  };

}
