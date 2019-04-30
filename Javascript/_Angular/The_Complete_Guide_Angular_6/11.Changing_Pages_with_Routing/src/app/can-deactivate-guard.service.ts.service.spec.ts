import { TestBed, inject } from '@angular/core/testing';

import { CanDeactivateGuard.Service.TsService } from './can-deactivate-guard.service.ts.service';

describe('CanDeactivateGuard.Service.TsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CanDeactivateGuard.Service.TsService]
    });
  });

  it('should be created', inject([CanDeactivateGuard.Service.TsService], (service: CanDeactivateGuard.Service.TsService) => {
    expect(service).toBeTruthy();
  }));
});
