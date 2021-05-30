import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Location } from 'src/app/models/location';
import { AuthService } from 'src/app/services/auth.service';
import { ReviewsNewComponent } from '../reviews-new/reviews-new.component';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  @Input() location: Location;

  constructor(
    private authService: AuthService,
    private dialog: MatDialog) { }

  ngOnInit(): void {
  }

  OpenNewReviewDialog(): void {
    const dialogRef = this.dialog.open(
      ReviewsNewComponent,
      {
        "disableClose": true,
        "data": { "locationId": this.location._id }
      });

      dialogRef.afterClosed().subscribe( data =>
        //do somehting here later. Need to retrieve reviews as observables.
        {}
      );
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

}
