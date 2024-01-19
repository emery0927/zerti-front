import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEducationalInstituteComponent } from './create-educational-institute.component';

describe('CreateEducationalInstituteComponent', () => {
  let component: CreateEducationalInstituteComponent;
  let fixture: ComponentFixture<CreateEducationalInstituteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateEducationalInstituteComponent]
    });
    fixture = TestBed.createComponent(CreateEducationalInstituteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
