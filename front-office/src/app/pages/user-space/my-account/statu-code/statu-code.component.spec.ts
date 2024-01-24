import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatuCodeComponent } from './statu-code.component';

describe('StatuCodeComponent', () => {
  let component: StatuCodeComponent;
  let fixture: ComponentFixture<StatuCodeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatuCodeComponent],
    });
    fixture = TestBed.createComponent(StatuCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
