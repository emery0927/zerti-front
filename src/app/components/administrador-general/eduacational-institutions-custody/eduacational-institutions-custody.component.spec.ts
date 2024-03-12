import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EduacationalInstitutionsCustodyComponent } from './eduacational-institutions-custody.component';

describe('EduacationalInstitutionsCustodyComponent', () => {
  let component: EduacationalInstitutionsCustodyComponent;
  let fixture: ComponentFixture<EduacationalInstitutionsCustodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EduacationalInstitutionsCustodyComponent]
    });
    fixture = TestBed.createComponent(EduacationalInstitutionsCustodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
