import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameTriedComponent } from './game-tried.component';

describe('GameTriedComponent', () => {
  let component: GameTriedComponent;
  let fixture: ComponentFixture<GameTriedComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GameTriedComponent],
    });
    fixture = TestBed.createComponent(GameTriedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
