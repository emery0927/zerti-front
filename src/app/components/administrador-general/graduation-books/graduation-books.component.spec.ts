import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraduationBooksComponent } from './graduation-books.component';

describe('GraduationBooksComponent', () => {
  let component: GraduationBooksComponent;
  let fixture: ComponentFixture<GraduationBooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GraduationBooksComponent]
    });
    fixture = TestBed.createComponent(GraduationBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
