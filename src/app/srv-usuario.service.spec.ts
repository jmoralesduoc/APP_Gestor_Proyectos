import { TestBed } from '@angular/core/testing';

import { SrvUsuarioService } from './srv-usuario.service';

describe('SrvUsuarioService', () => {
  let service: SrvUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SrvUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
