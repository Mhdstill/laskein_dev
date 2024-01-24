import { TestBed } from '@angular/core/testing';

import { OuterTransactionService } from './outer-transaction.service';

describe('OuterTransactionService', () => {
  let service: OuterTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OuterTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
