import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSpaceComponent } from './user-space.component';

describe('UserSpaceComponent', () => {
  let component: UserSpaceComponent;
  let fixture: ComponentFixture<UserSpaceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserSpaceComponent],
    });
    fixture = TestBed.createComponent(UserSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
