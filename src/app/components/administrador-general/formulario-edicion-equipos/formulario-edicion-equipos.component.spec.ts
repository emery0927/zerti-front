import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEdicionEquiposComponent } from './formulario-edicion-equipos.component';

describe('FormularioEdicionEquiposComponent', () => {
  let component: FormularioEdicionEquiposComponent;
  let fixture: ComponentFixture<FormularioEdicionEquiposComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioEdicionEquiposComponent]
    });
    fixture = TestBed.createComponent(FormularioEdicionEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
