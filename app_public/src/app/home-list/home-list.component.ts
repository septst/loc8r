import { Component, OnInit } from '@angular/core';
import { CounterService } from '../counter.service';
import { DataService } from '../data.service';

export class Location{
  _id: string = "";
  name: string = "";
  address: string ="";
  distance: number =0; 
  rating: number =0; 
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
    private dataService: DataService) { }

  public locations: Location[] = [];

  ngOnInit(): void {
    this.getLocations();
  }

  public counter(i: number): Array<number>{
    return this.counterService.counter(i);
  }

  private getLocations(): void{
    this.dataService.getLocations()
      .then(locations => this.locations = locations);
  }

}
