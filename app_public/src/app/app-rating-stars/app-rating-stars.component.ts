import { Component, OnInit, Input } from '@angular/core';
import { CounterService } from '../services/counter.service';
@Component({
  selector: 'app-rating-stars',
  templateUrl: './app-rating-stars.component.html',
  styleUrls: ['./app-rating-stars.component.css']
})
export class AppRatingStarsComponent implements OnInit {

  @Input() rating:number = 0;
  @Input() reviewsCount:number = 0;
  @Input() displayRating:boolean = false;
  
  constructor(private counterService:CounterService) { }

  ngOnInit(): void {
  }
  
  public counter(i: number): Array<number> {
    return this.counterService.counter(i);
  }

}
