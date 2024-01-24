import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGrosLotComponent } from './card-gros-lot.component';

describe('CardGrosLotComponent', () => {
  let component: CardGrosLotComponent;
  let fixture: ComponentFixture<CardGrosLotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardGrosLotComponent],
    });
    fixture = TestBed.createComponent(CardGrosLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
