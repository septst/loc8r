import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRatingStarsInputComponent } from './app-rating-stars-input.component';

describe('AppRatingStarsInputComponent', () => {
  let component: AppRatingStarsInputComponent;
  let fixture: ComponentFixture<AppRatingStarsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppRatingStarsInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRatingStarsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
