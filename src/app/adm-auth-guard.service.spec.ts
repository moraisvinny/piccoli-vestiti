import { TestBed, inject } from '@angular/core/testing';

import { AdmAuthGuardService } from './adm-auth-guard.service';

describe('AdmAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdmAuthGuardService]
    });
  });

  it('should be created', inject([AdmAuthGuardService], (service: AdmAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
