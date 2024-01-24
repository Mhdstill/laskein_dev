import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonAdresseComponent } from './mon-adresse.component';

describe('MonAdresseComponent', () => {
  let component: MonAdresseComponent;
  let fixture: ComponentFixture<MonAdresseComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MonAdresseComponent],
    });
    fixture = TestBed.createComponent(MonAdresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
