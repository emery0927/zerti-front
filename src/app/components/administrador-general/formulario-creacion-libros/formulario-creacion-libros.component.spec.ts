import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCreacionLibrosComponent } from './formulario-creacion-libros.component';

describe('FormularioCreacionLibrosComponent', () => {
  let component: FormularioCreacionLibrosComponent;
  let fixture: ComponentFixture<FormularioCreacionLibrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioCreacionLibrosComponent]
    });
    fixture = TestBed.createComponent(FormularioCreacionLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
