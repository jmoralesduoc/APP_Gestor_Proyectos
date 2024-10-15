import { TestBed } from '@angular/core/testing';

import { SrvSqlliteService } from './srv-sqllite.service';

describe('SrvSqlliteService', () => {
  let service: SrvSqlliteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrvSqlliteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
