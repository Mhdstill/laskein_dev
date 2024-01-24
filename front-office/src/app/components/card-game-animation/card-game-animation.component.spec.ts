import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardGameAnimationComponent } from './card-game-animation.component';

describe('CardGameAnimationComponent', () => {
  let component: CardGameAnimationComponent;
  let fixture: ComponentFixture<CardGameAnimationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardGameAnimationComponent],
    });
    fixture = TestBed.createComponent(CardGameAnimationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
