import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEducationalInstitutionComponent } from './edit-educational-institution.component';

describe('EditEducationalInstitutionComponent', () => {
  let component: EditEducationalInstitutionComponent;
  let fixture: ComponentFixture<EditEducationalInstitutionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEducationalInstitutionComponent]
    });
    fixture = TestBed.createComponent(EditEducationalInstitutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
