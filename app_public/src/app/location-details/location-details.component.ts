import { Component, OnInit, Input } from '@angular/core';

import { Location } from '../home-list/home-list.component';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

  @Input() location: Location;
  
  public hasDetails: boolean;
  public gApiKai: string = "AIzaSyBQI3HH1w6dv7ihEcwdjYj65x_bScZT1IA";

  constructor() { }

  ngOnInit(): void {   
    this.hasDetails = (this.location !== null && 
      this.location !== undefined && this.location instanceof Location);
  }
}
