import { Component, OnInit } from '@angular/core';
import { MapMarker } from '@angular/google-maps';
import { Observable, of } from 'rxjs';
import { Location } from 'src/app/models/location';
import { DataService } from 'src/app/services/data.service';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { LoggingService } from 'src/app/services/logging.service';
import { ProgressBarService } from 'src/app/services/progress-bar.service';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  public message: string = "";
  public position$: Observable<GeolocationPosition>;
  public locations$: Observable<Location[]>;

  constructor(
    private loggingService: LoggingService,
    private dataService: DataService,
    private geolocationService: GeolocationService,
    private progessbarService: ProgressBarService) { }

  ngOnInit(): void {
    this.progessbarService.show.next(true);
    this.getPosition();
  }

  private getPosition(): void {
    this.message = "Getting your location...";
    this.geolocationService.getPosition(
      this.updatePosition.bind(this),
      this.showError.bind(this),
      this.noGeo.bind(this)
    );
  }

  public pageContent = {
    header: {
      title: 'Find places to work with wifi near you!'
    },
    sidebar: 'Looking for wifi and a seat? Loc8r helps you find places \
    to work when out and about. Perhaps with coffee, cake or a pint?\
    Let Loc8r help you find the place you\'re looking for.'
  };

  private updatePosition(position: GeolocationPosition){
    this.position$ = of(position);
    const lat: number = position.coords.latitude;
    const lng: number = position.coords.longitude;
    //log this against user logs later
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
