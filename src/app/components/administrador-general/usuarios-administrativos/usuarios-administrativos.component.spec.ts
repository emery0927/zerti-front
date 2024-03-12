import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosAdministrativosComponent } from './usuarios-administrativos.component';

describe('UsuariosAdministrativosComponent', () => {
  let component: UsuariosAdministrativosComponent;
  let fixture: ComponentFixture<UsuariosAdministrativosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuariosAdministrativosComponent]
    });
    fixture = TestBed.createComponent(UsuariosAdministrativosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
