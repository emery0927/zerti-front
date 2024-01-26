import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitalGradeValidationBookComponent } from './digital-grade-validation-book.component';

describe('DigitalGradeValidationBookComponent', () => {
  let component: DigitalGradeValidationBookComponent;
  let fixture: ComponentFixture<DigitalGradeValidationBookComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DigitalGradeValidationBookComponent]
    });
    fixture = TestBed.createComponent(DigitalGradeValidationBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
