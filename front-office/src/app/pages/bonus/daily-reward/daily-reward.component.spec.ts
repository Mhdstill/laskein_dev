import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyRewardComponent } from './daily-reward.component';

describe('DailyRewardComponent', () => {
  let component: DailyRewardComponent;
  let fixture: ComponentFixture<DailyRewardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyRewardComponent],
    });
    fixture = TestBed.createComponent(DailyRewardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
