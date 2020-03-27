import { TestBed } from '@angular/core/testing';

import { DfeedService } from './dfeed.service';

describe('DfeedService', () => {
  let service: DfeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DfeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
