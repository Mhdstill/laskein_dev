import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PorteFeuilleComponent } from './porte-feuille.component';

describe('PorteFeuilleComponent', () => {
  let component: PorteFeuilleComponent;
  let fixture: ComponentFixture<PorteFeuilleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PorteFeuilleComponent],
    });
    fixture = TestBed.createComponent(PorteFeuilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
