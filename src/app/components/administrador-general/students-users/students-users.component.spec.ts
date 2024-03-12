import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentsUsersComponent } from './students-users.component';

describe('StudentsUsersComponent', () => {
  let component: StudentsUsersComponent;
  let fixture: ComponentFixture<StudentsUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudentsUsersComponent]
    });
    fixture = TestBed.createComponent(StudentsUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
