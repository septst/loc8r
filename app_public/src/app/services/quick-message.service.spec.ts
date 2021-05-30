import { TestBed } from '@angular/core/testing';

import { QuickMessageService } from './quick-message.service';

describe('QuickMessageService', () => {
  let service: QuickMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuickMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
