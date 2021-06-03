import { Component, Input, OnInit } from '@angular/core';

import { Location } from '../../models/location';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  @Input() locations: Location[];

  constructor() { }

  public message: string = "";

  ngOnInit(): void {
  }
}
