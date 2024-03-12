import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SedesManagementComponent } from './sedes-management.component';

describe('SedesManagementComponent', () => {
  let component: SedesManagementComponent;
  let fixture: ComponentFixture<SedesManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SedesManagementComponent]
    });
    fixture = TestBed.createComponent(SedesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
