import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoggerFormComponent } from './logger-form.component';

describe('LoggerFormComponent', () => {
  let component: LoggerFormComponent;
  let fixture: ComponentFixture<LoggerFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoggerFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoggerFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
