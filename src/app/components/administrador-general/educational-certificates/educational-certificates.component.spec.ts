import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalCertificatesComponent } from './educational-certificates.component';

describe('EducationalCertificatesComponent', () => {
  let component: EducationalCertificatesComponent;
  let fixture: ComponentFixture<EducationalCertificatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EducationalCertificatesComponent]
    });
    fixture = TestBed.createComponent(EducationalCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
