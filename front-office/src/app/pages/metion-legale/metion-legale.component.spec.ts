import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MetionLegaleComponent } from './metion-legale.component';

describe('MetionLegaleComponent', () => {
  let component: MetionLegaleComponent;
  let fixture: ComponentFixture<MetionLegaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MetionLegaleComponent],
    });
    fixture = TestBed.createComponent(MetionLegaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
