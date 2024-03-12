import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquiposServicioCreacionComponent } from './equipos-servicio-creacion.component';

describe('EquiposServicioCreacionComponent', () => {
  let component: EquiposServicioCreacionComponent;
  let fixture: ComponentFixture<EquiposServicioCreacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EquiposServicioCreacionComponent]
    });
    fixture = TestBed.createComponent(EquiposServicioCreacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
