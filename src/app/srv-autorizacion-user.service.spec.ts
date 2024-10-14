import { TestBed } from '@angular/core/testing';

import { SrvAutorizacionUserService } from './srv-autorizacion-user.service';

describe('SrvAutorizacionUserService', () => {
  let service: SrvAutorizacionUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrvAutorizacionUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
