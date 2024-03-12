import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCreacionEntidadesComponent } from './formulario-creacion-entidades.component';

describe('FormularioCreacionEntidadesComponent', () => {
  let component: FormularioCreacionEntidadesComponent;
  let fixture: ComponentFixture<FormularioCreacionEntidadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioCreacionEntidadesComponent]
    });
    fixture = TestBed.createComponent(FormularioCreacionEntidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
