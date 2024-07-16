import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEdicionPaginaComponent } from './formulario-edicion-pagina.component';

describe('FormularioEdicionPaginaComponent', () => {
  let component: FormularioEdicionPaginaComponent;
  let fixture: ComponentFixture<FormularioEdicionPaginaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioEdicionPaginaComponent]
    });
    fixture = TestBed.createComponent(FormularioEdicionPaginaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
