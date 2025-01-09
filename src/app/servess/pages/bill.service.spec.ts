import { TestBed } from '@angular/core/testing';

import { BillService } from 'src/app/interfaces/athuntocation/signin';

describe('BillService', () => {
  let service: BillService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
