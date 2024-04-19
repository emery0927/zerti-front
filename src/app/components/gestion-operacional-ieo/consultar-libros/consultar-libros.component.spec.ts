import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarLibrosComponent } from './consultar-libros.component';

describe('ConsultarLibrosComponent', () => {
  let component: ConsultarLibrosComponent;
  let fixture: ComponentFixture<ConsultarLibrosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConsultarLibrosComponent]
    });
    fixture = TestBed.createComponent(ConsultarLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
