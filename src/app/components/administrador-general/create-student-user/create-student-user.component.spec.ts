import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStudentUserComponent } from './create-student-user.component';

describe('CreateStudentUserComponent', () => {
  let component: CreateStudentUserComponent;
  let fixture: ComponentFixture<CreateStudentUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateStudentUserComponent]
    });
    fixture = TestBed.createComponent(CreateStudentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
