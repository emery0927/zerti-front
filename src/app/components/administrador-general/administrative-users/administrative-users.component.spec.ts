import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeUsersComponent } from './administrative-users.component';

describe('AdministrativeUsersComponent', () => {
  let component: AdministrativeUsersComponent;
  let fixture: ComponentFixture<AdministrativeUsersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrativeUsersComponent]
    });
    fixture = TestBed.createComponent(AdministrativeUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
