import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditStudentUserComponent } from './edit-student-user.component';

describe('EditStudentUserComponent', () => {
  let component: EditStudentUserComponent;
  let fixture: ComponentFixture<EditStudentUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditStudentUserComponent]
    });
    fixture = TestBed.createComponent(EditStudentUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
