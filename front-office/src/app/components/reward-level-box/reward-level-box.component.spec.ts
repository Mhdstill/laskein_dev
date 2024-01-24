import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardLevelBoxComponent } from './reward-level-box.component';

describe('RewardLevelBoxComponent', () => {
  let component: RewardLevelBoxComponent;
  let fixture: ComponentFixture<RewardLevelBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RewardLevelBoxComponent],
    });
    fixture = TestBed.createComponent(RewardLevelBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
