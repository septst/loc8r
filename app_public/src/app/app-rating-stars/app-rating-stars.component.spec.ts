import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppRatingStarsComponent } from './app-rating-stars.component';

describe('AppRatingStarsComponent', () => {
  let component: AppRatingStarsComponent;
  let fixture: ComponentFixture<AppRatingStarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppRatingStarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppRatingStarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
