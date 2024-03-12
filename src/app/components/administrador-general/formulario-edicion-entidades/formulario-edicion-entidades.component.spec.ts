import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEdicionEntidadesComponent } from './formulario-edicion-entidades.component';

describe('FormularioEdicionEntidadesComponent', () => {
  let component: FormularioEdicionEntidadesComponent;
  let fixture: ComponentFixture<FormularioEdicionEntidadesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioEdicionEntidadesComponent]
    });
    fixture = TestBed.createComponent(FormularioEdicionEntidadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
