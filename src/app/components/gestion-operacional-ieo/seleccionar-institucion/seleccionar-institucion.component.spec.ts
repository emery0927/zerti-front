import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeleccionarInstitucionComponent } from './seleccionar-institucion.component';

describe('SeleccionarInstitucionComponent', () => {
  let component: SeleccionarInstitucionComponent;
  let fixture: ComponentFixture<SeleccionarInstitucionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeleccionarInstitucionComponent]
    });
    fixture = TestBed.createComponent(SeleccionarInstitucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
