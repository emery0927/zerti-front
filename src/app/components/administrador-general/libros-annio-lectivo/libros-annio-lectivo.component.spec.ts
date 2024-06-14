import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LibrosAnnioLectivoComponent } from './libros-annio-lectivo.component';

describe('LibrosAnnioLectivoComponent', () => {
  let component: LibrosAnnioLectivoComponent;
  let fixture: ComponentFixture<LibrosAnnioLectivoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LibrosAnnioLectivoComponent]
    });
    fixture = TestBed.createComponent(LibrosAnnioLectivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
