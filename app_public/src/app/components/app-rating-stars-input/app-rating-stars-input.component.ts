import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CounterService } from 'src/app/services/counter.service';

@Component({
  selector: 'app-app-rating-stars-input',
  templateUrl: './app-rating-stars-input.component.html',
  styleUrls: ['./app-rating-stars-input.component.css']
})
export class AppRatingStarsInputComponent implements OnInit {

  @Input('rating') public rating: number = 3;
  @Input('starCount') public starCount: number = 5;

  @Output() private ratingUpdated = new EventEmitter();


  constructor(private counterService:CounterService) { }

  ngOnInit(): void {
  }

  public counter(i: number): Array<number> {
    return this.counterService.counter(i);
  }

  onClick(newRating:number) {
    this.rating = newRating;
    this.ratingUpdated.emit(newRating);
    return false;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

}
