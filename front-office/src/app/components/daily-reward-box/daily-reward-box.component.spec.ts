import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyRewardBoxComponent } from './daily-reward-box.component';

describe('DailyRewardBoxComponent', () => {
  let component: DailyRewardBoxComponent;
  let fixture: ComponentFixture<DailyRewardBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DailyRewardBoxComponent],
    });
    fixture = TestBed.createComponent(DailyRewardBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
