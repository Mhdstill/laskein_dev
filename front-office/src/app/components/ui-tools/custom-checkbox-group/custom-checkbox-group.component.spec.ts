import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomCheckboxGroupComponent } from './custom-checkbox-group.component';

describe('CustomCheckboxComponent', () => {
  let component: CustomCheckboxGroupComponent;
  let fixture: ComponentFixture<CustomCheckboxGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomCheckboxGroupComponent],
    });
    fixture = TestBed.createComponent(CustomCheckboxGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
