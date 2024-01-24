import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileulComponent } from './fileul.component';

describe('FileulComponent', () => {
  let component: FileulComponent;
  let fixture: ComponentFixture<FileulComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FileulComponent],
    });
    fixture = TestBed.createComponent(FileulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
