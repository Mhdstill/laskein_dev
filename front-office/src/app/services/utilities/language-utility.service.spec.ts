import { TestBed } from '@angular/core/testing';

import { LanguageUtilityService } from './language-utility.service';

describe('LanguageUtilityService', () => {
  let service: LanguageUtilityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LanguageUtilityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
