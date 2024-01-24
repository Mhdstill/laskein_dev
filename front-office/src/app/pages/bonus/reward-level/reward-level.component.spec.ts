import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardLevelComponent } from './reward-level.component';

describe('RewardLevelComponent', () => {
  let component: RewardLevelComponent;
  let fixture: ComponentFixture<RewardLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RewardLevelComponent],
    });
    fixture = TestBed.createComponent(RewardLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
