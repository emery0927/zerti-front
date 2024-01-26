import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoodsAndServicesSuppliersComponent } from './goods-and-services-suppliers.component';

describe('GoodsAndServicesSuppliersComponent', () => {
  let component: GoodsAndServicesSuppliersComponent;
  let fixture: ComponentFixture<GoodsAndServicesSuppliersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoodsAndServicesSuppliersComponent]
    });
    fixture = TestBed.createComponent(GoodsAndServicesSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
