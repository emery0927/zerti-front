import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionCertificadosEstudioComponent } from './gestion-certificados-estudio.component';

describe('GestionCertificadosEstudioComponent', () => {
  let component: GestionCertificadosEstudioComponent;
  let fixture: ComponentFixture<GestionCertificadosEstudioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionCertificadosEstudioComponent]
    });
    fixture = TestBed.createComponent(GestionCertificadosEstudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
