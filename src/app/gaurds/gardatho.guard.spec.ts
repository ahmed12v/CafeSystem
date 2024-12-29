import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { gardathoGuard } from './gardatho.guard';

describe('gardathoGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => gardathoGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
