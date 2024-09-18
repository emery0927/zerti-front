import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarLibrosFinalesComponent } from './consultar-libros-finales.component';

describe('ConsultarLibrosFinalesComponent', () => {
  let component: ConsultarLibrosFinalesComponent;
  let fixture: ComponentFixture<ConsultarLibrosFinalesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarLibrosFinalesComponent]
    });
    fixture = TestBed.createComponent(ConsultarLibrosFinalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
