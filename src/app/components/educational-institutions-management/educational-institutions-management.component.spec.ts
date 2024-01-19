import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalInstitutionsManagementComponent } from './educational-institutions-management.component';

describe('EducationalInstitutionsManagementComponent', () => {
  let component: EducationalInstitutionsManagementComponent;
  let fixture: ComponentFixture<EducationalInstitutionsManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducationalInstitutionsManagementComponent]
    });
    fixture = TestBed.createComponent(EducationalInstitutionsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
