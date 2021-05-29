import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Location } from 'src/app/models/location';
import { ReviewsNewComponent } from '../reviews-new/reviews-new.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  @Input() location: Location;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  OpenNewReviewDialog(): void {
    this.dialog.open(ReviewsNewComponent,
      {
        "disableClose": true,
        "data": { "locationId": this.location._id }
      });
  }

}
