import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCreacionUsuarioAdminComponent } from './formulario-creacion-usuario-admin.component';

describe('FormularioCreacionUsuarioAdminComponent', () => {
  let component: FormularioCreacionUsuarioAdminComponent;
  let fixture: ComponentFixture<FormularioCreacionUsuarioAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioCreacionUsuarioAdminComponent]
    });
    fixture = TestBed.createComponent(FormularioCreacionUsuarioAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
