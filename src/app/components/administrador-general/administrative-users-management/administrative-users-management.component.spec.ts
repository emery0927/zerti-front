import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministrativeUsersManagementComponent } from './administrative-users-management.component';

describe('AdministrativeUsersManagementComponent', () => {
  let component: AdministrativeUsersManagementComponent;
  let fixture: ComponentFixture<AdministrativeUsersManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdministrativeUsersManagementComponent]
    });
    fixture = TestBed.createComponent(AdministrativeUsersManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
