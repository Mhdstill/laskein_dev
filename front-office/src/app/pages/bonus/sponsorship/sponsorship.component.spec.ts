import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsorshipComponent } from './sponsorship.component';

describe('SponsorshipComponent', () => {
  let component: SponsorshipComponent;
  let fixture: ComponentFixture<SponsorshipComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SponsorshipComponent],
    });
    fixture = TestBed.createComponent(SponsorshipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
