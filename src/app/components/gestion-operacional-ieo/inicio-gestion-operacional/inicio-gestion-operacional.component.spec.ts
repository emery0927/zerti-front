import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioGestionOperacionalComponent } from './inicio-gestion-operacional.component';

describe('InicioGestionOperacionalComponent', () => {
  let component: InicioGestionOperacionalComponent;
  let fixture: ComponentFixture<InicioGestionOperacionalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InicioGestionOperacionalComponent]
    });
    fixture = TestBed.createComponent(InicioGestionOperacionalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
