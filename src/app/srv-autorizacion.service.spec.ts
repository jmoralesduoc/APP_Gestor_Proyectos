import { TestBed } from '@angular/core/testing';

import { SrvAutorizacionService } from './srv-autorizacion.service';

describe('SrvAutorizacionService', () => {
  let service: SrvAutorizacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrvAutorizacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
