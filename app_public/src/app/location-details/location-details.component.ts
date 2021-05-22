import { Component, OnInit, Input } from '@angular/core';

import { DataService } from '../data.service';
import { SecretsService } from '../secrets.service';
import { Location, Review } from '../location';

@Component({
  selector: 'app-location-details',
  templateUrl: './location-details.component.html',
  styleUrls: ['./location-details.component.css']
})
export class LocationDetailsComponent implements OnInit {

  @Input() location: Location;

  public hasDetails: boolean;
  public gApiKey: string = "";
  public showForm: boolean = false;
  public formError: string;
  public addReviewSubscription: any;
  public newReview: Review = {
    author: "",
    rating: 5,
    reviewText: ""
  };

  constructor(
    private dataService: DataService,
    private secretsService: SecretsService) { }

  ngOnInit(): void {
    this.secretsService
      .getSecretByKey("GOOGLE_API_KEY")
      .then(result => {
        if (!result.message) {
          this.gApiKey = result.secret;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.addReviewSubscription) {
      this.addReviewSubscription.unsubscribe();
    }
  }

  public onReviewSubmit(): void {
    this.formError = '';
    if (this.isFormValid()) {
      console.log(this.newReview);
      this.addReviewSubscription =
        this.dataService.addReviewById(this.location._id, this.newReview)
          .subscribe((review: any) => {
            console.log("Added your review successfully", "color:green");
            let reviews = this.location.reviews.slice(0);
            reviews.unshift(review);
            this.location.reviews = reviews;
            this.resetAndHideReviewForm();
          });
    } else {
      this.formError = 'All fields required, please try again';
    }
  }

  private isFormValid(): boolean {
    return (this.newReview.author
      && this.newReview.rating
      && this.newReview.reviewText) ?
      true :
      false;
  }

  private resetAndHideReviewForm(): void {
    this.showForm = false;
    this.formError = "";
    this.newReview.author = "";
    this.newReview.reviewText = "";
    this.newReview.rating = 5;
  }
}
