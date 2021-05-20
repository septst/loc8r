import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { DataService } from '../data.service';
import { GeolocationService } from '../geolocation.service';

export class Location {
  _id: string;
  name: string;
  address: string;
  distance: number;
  rating: number;
  facilities: string[];
  openingTimes: OpeningTime[];
  coordinates: Coordinates;
  reviews: [Review];
}

export class OpeningTime {
  days: string;
  opening: string;
  closing: string;
  closed: boolean;
}

export class Review {
  _id: string;
  author: string;
  rating: number;
  reviewText: string;
  createdOn: Date;
}

export class Coordinates{
  latitude: number;
  longitude: number;
}

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  constructor(
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
    // const lat: number = position.coords.latitude; 
    // const lng: number = position.coords.longitude; 
    const lat: number = 12.9716;
    const lng: number = 77.5946;
    this.locations$ = this.dataService.getLocations(lat, lng)
  }

  private noGeo(): void {
    this.message = 'Geolocation not supported by this browser.';
  };

  private showError(error: any): void {
    this.message = error.message;
  };

}
