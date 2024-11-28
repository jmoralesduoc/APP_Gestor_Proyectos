import { TestBed } from '@angular/core/testing';

import { SrvClientesService } from './srv-clientes.service';

describe('SrvClientesService', () => {
  let service: SrvClientesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrvClientesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
