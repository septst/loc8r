import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Location, Review } from 'src/app/models/location';
import { AuthService } from 'src/app/services/auth.service';
import { DataService } from 'src/app/services/data.service';
import { QuickMessageService } from 'src/app/services/quick-message.service';

@Component({
  selector: 'app-reviews-new',
  templateUrl: './reviews-new.component.html',
  styleUrls: ['./reviews-new.component.css']
})
export class ReviewsNewComponent implements OnInit {

  @Input() locationId: string;

  public showForm: boolean = false;
  public formError: string;
  public addReviewSubscription: any;
  public reviewForm: FormGroup;
  public reviewSubmitted: boolean = false;
  public currentUserName: string;
  public rating: number;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private authService: AuthService,
    private quickMessageService: QuickMessageService,
    private dialogRef: MatDialogRef<ReviewsNewComponent>,
    @Inject(MAT_DIALOG_DATA) data: any) {
    this.locationId = data.locationId;
  }

  ngOnInit(): void {

    this.reviewForm = this.formBuilder.group({
      reviewText: ["", [Validators.required, Validators.maxLength(4000)]]
    });

    this.currentUserName = this.getUsername();
  }

  ngOnDestroy(): void {
    if (this.addReviewSubscription) {
      this.addReviewSubscription.unsubscribe();
    }
  }

  get controls() {
    return this.reviewForm.controls;
  }

  addRating(newRating: number) {
    this.rating = newRating;
  }

  public onReviewSubmit(): void {

    this.formError = '';
    this.reviewSubmitted = true;

    if (this.reviewForm.invalid) {
      console.log("invalid");

      return;
    }

    const newReview: Review = this.reviewForm.value as Review;
    newReview.author = this.getUsername();
    newReview.rating = this.rating;

    this.addReviewSubscription =
      this.dataService.addReviewById(this.locationId, newReview)
        .subscribe((review: any) => {
          this.quickMessageService.push("Congrats! Your review is posted successfully");
          this.reviewSubmitted = false;
          this.reviewForm.reset();
          this.dialogRef.close();
        });
  }

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  public getUsername(): string {
    const name = this.authService.getCurrentUser()?.name;
    return name ? name : 'Guest';
  }

}
