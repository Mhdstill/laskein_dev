import { TestBed } from '@angular/core/testing';

import { RewardLevelService } from './reward-level.service';

describe('RewardLevelService', () => {
  let service: RewardLevelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RewardLevelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
