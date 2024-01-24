import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinCircleComponent } from './spin-circle.component';

describe('SpinCircleComponent', () => {
  let component: SpinCircleComponent;
  let fixture: ComponentFixture<SpinCircleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpinCircleComponent],
    });
    fixture = TestBed.createComponent(SpinCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
