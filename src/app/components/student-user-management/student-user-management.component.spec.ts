import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentUserManagementComponent } from './student-user-management.component';

describe('StudentUserManagementComponent', () => {
  let component: StudentUserManagementComponent;
  let fixture: ComponentFixture<StudentUserManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentUserManagementComponent]
    });
    fixture = TestBed.createComponent(StudentUserManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
