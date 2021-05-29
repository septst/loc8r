import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';

import { DataService } from '../../services/data.service';
import { Location } from '../../models/location';

@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.css']
})
export class DetailsPageComponent implements OnInit {

  location$: Observable<Location>;

  public sidebar: string = " is on Loc8r\
  because it has accessible wifi and space to sit down with\
  your laptop and get some work done.\n\nIf you\'ve been and\
  you like it - or if you don\'t - please leave a review to\
  help other people just like you."

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const locationId = routeParams.get("locationId");
    this.location$ = this.dataService.getLocationById(locationId || "");
  }

  public pageContent = {
    header: {
      title: 'Location name',
      strapline: ''

    },
    sidebar: 'is on Loc8r because it has accessible wifi and space\
    to sit down with your laptop and get some work done.\n\nIf\
    you\'ve been and you like it - or if you don\'t - please\
    leave a review to help other people just like you.'
  };
}
