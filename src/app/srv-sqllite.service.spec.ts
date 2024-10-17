import { TestBed } from '@angular/core/testing';

import { SQLiteService } from './srv-sqllite.service';

describe('SrvSqlliteService', () => {
  let service: SQLiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SQLiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
