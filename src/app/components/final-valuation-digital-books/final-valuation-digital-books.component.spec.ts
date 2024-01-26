import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalValuationDigitalBooksComponent } from './final-valuation-digital-books.component';

describe('FinalValuationDigitalBooksComponent', () => {
  let component: FinalValuationDigitalBooksComponent;
  let fixture: ComponentFixture<FinalValuationDigitalBooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FinalValuationDigitalBooksComponent]
    });
    fixture = TestBed.createComponent(FinalValuationDigitalBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
