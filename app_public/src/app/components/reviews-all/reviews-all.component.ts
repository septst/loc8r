import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Review } from 'src/app/models/location';

@Component({
  selector: 'app-reviews-all',
  templateUrl: './reviews-all.component.html',
  styleUrls: ['./reviews-all.component.css']
})
export class ReviewsAllComponent implements OnInit {

  public reviews: Review[];

  constructor(@Inject(MAT_DIALOG_DATA) data: any) {
    this.reviews = data.reviews;
  }

  ngOnInit(): void {
  }

}
