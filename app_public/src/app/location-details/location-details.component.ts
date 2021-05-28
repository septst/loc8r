import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataService } from '../services/data.service';
import { SecretsService } from '../services/secrets.service';
import { Location, Review } from '../models/location';
import { AuthService } from '../services/auth.service';

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
  public reviewForm: FormGroup;
  public reviewSubmitted: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private secretsService: SecretsService,
    private authService: AuthService) { }

  ngOnInit(): void {

    this.reviewForm = this.formBuilder.group({
      rating: ["", Validators.required],
      reviewText: ["", Validators.required]
    });

    //get G API key
    this.secretsService
      .getSecretByKey("GOOGLE_API_KEY")
      .then(result => {
        if (!result.message) {
          this.gApiKey = result.secret;
        }
      });
  }

  get controls() {
    return this.reviewForm.controls;
  }

  ngOnDestroy(): void {
    if (this.addReviewSubscription) {
      this.addReviewSubscription.unsubscribe();
    }
  }

  public onReviewSubmit(): void {
    this.formError = '';
    this.reviewSubmitted = true;

    if (this.reviewForm.invalid) {
      return;
    }

    const newReview: Review = this.reviewForm.value as Review;
    newReview.author = this.getUsername();

    this.addReviewSubscription =
      this.dataService.addReviewById(this.location._id, newReview)
        .subscribe((review: any) => {
          console.log("Added your review successfully");
          let reviews = this.location.reviews.slice(0);
          reviews.unshift(review);
          this.location.reviews = reviews;
          this.reviewSubmitted = false;
          this.reviewForm.reset();
        });

  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public getUsername(): string {
    const { name } = this.authService.getCurrentUser();
    return name ? name : 'Guest';
  }
}
