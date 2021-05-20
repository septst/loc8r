import { Component, OnInit, Input } from '@angular/core';
import { CounterService } from '../counter.service';
@Component({
  selector: 'app-rating-stars',
  templateUrl: './app-rating-stars.component.html',
  styleUrls: ['./app-rating-stars.component.css']
})
export class AppRatingStarsComponent implements OnInit {

  @Input() rating:number = 0;

  constructor(private counterService:CounterService) { }

  ngOnInit(): void {
  }
  
  public counter(i: number): Array<number> {
    return this.counterService.counter(i);
  }

}
