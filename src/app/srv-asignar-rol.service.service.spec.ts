import { TestBed } from '@angular/core/testing';

import { SrvAsignarRolServiceService } from './srv-asignar-rol.service.service';

describe('SrvAsignarRolServiceService', () => {
  let service: SrvAsignarRolServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrvAsignarRolServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
