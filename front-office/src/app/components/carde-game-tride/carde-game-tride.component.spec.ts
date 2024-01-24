import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardeGameTrideComponent } from './carde-game-tride.component';

describe('CardeGameTrideComponent', () => {
  let component: CardeGameTrideComponent;
  let fixture: ComponentFixture<CardeGameTrideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardeGameTrideComponent],
    });
    fixture = TestBed.createComponent(CardeGameTrideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
