import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginasFoliosComponent } from './paginas-folios.component';

describe('PaginasFoliosComponent', () => {
  let component: PaginasFoliosComponent;
  let fixture: ComponentFixture<PaginasFoliosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaginasFoliosComponent]
    });
    fixture = TestBed.createComponent(PaginasFoliosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
