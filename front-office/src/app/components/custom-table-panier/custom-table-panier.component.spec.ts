import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomTablePanierComponent } from './custom-table-panier.component';

describe('CustomTablePanierComponent', () => {
  let component: CustomTablePanierComponent;
  let fixture: ComponentFixture<CustomTablePanierComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CustomTablePanierComponent],
    });
    fixture = TestBed.createComponent(CustomTablePanierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
