import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTenisComponent } from './card-tenis.component';

describe('CardTenisComponent', () => {
  let component: CardTenisComponent;
  let fixture: ComponentFixture<CardTenisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardTenisComponent],
    });
    fixture = TestBed.createComponent(CardTenisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
