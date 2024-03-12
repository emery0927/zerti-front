import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntidadesTerritorialesComponent } from './entidades-territoriales.component';

describe('EntidadesTerritorialesComponent', () => {
  let component: EntidadesTerritorialesComponent;
  let fixture: ComponentFixture<EntidadesTerritorialesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntidadesTerritorialesComponent]
    });
    fixture = TestBed.createComponent(EntidadesTerritorialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
