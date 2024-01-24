import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeConfirmationComponent } from './code-confirmation.component';

describe('CodeConfirmationComponent', () => {
  let component: CodeConfirmationComponent;
  let fixture: ComponentFixture<CodeConfirmationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CodeConfirmationComponent],
    });
    fixture = TestBed.createComponent(CodeConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
