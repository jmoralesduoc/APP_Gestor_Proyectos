import { TestBed } from '@angular/core/testing';

import { SrvDataService } from './srv-data.service';

describe('SrvDataService', () => {
  let service: SrvDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrvDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
