import { Component, Input, OnInit } from '@angular/core';

import { Location } from '../../models/location';
import { FrameworkService } from 'src/app/services/framework.service';

@Component({
  selector: 'app-home-list',
  templateUrl: './home-list.component.html',
  styleUrls: ['./home-list.component.css']
})
export class HomeListComponent implements OnInit {

  @Input() locations: Location[];

  constructor(
    private frameworkServicw: FrameworkService) { }

  public message: string = "";

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.frameworkServicw.showProgress.next(false);
  }
}
