import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperationalRolesComponent } from './operational-roles.component';

describe('OperationalRolesComponent', () => {
  let component: OperationalRolesComponent;
  let fixture: ComponentFixture<OperationalRolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OperationalRolesComponent]
    });
    fixture = TestBed.createComponent(OperationalRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
