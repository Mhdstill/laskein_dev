import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegleDuJeuxComponent } from './regle-du-jeux.component';

describe('RegleDuJeuxComponent', () => {
  let component: RegleDuJeuxComponent;
  let fixture: ComponentFixture<RegleDuJeuxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegleDuJeuxComponent],
    });
    fixture = TestBed.createComponent(RegleDuJeuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
