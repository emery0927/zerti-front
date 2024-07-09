import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioEdicionLibrosComponent } from './formulario-edicion-libros.component';

describe('FormularioEdicionLibrosComponent', () => {
  let component: FormularioEdicionLibrosComponent;
  let fixture: ComponentFixture<FormularioEdicionLibrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioEdicionLibrosComponent]
    });
    fixture = TestBed.createComponent(FormularioEdicionLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
