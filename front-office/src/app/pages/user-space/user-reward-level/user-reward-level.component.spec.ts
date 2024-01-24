import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRewardLevelComponent } from './user-reward-level.component';

describe('UserRewardLevelComponent', () => {
  let component: UserRewardLevelComponent;
  let fixture: ComponentFixture<UserRewardLevelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserRewardLevelComponent],
    });
    fixture = TestBed.createComponent(UserRewardLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
