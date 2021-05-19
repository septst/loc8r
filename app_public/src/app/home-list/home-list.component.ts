import { Component, OnInit } from '@angular/core';
import { CounterService } from '../counter.service';
import { DataService } from '../data.service';
import { GeolocationService } from '../geolocation.service';

export class Location {
  _id: string = "";
  name: string = "";
  address: string = "";
  distance: number = 0;
  rating: number = 0;
  facilities: string[] = [];
}

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  constructor(
    private counterService: CounterService,
    private dataService: DataService,
    private geolocationService: GeolocationService) { }

  public locations: Location[] = [];

  public message: string = "";

  ngOnInit(): void {
    this.getPosition();
  }

  public counter(i: number): Array<number> {
    return this.counterService.counter(i);
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
    this.dataService.getLocations(lat, lng)
      .then(locations => {
        this.message = locations.length > 0 ? '' : 'No locations found';
        this.locations = locations;
      });
  }

  private noGeo(): void {
    this.message = 'Geolocation not supported by this browser.';
  };

  private showError(error: any): void {
    this.message = error.message;
  };

}
