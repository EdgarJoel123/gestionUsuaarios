import { TestBed } from '@angular/core/testing';

import { ServiceAutentificacionService } from './service-autentificacion.service';

describe('ServiceAutentificacionService', () => {
  let service: ServiceAutentificacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceAutentificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
