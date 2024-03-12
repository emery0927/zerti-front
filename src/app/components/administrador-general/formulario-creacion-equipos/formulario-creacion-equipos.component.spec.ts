import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCreacionEquiposComponent } from './formulario-creacion-equipos.component';

describe('FormularioCreacionEquiposComponent', () => {
  let component: FormularioCreacionEquiposComponent;
  let fixture: ComponentFixture<FormularioCreacionEquiposComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioCreacionEquiposComponent]
    });
    fixture = TestBed.createComponent(FormularioCreacionEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
