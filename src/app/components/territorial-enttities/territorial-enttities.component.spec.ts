import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritorialEnttitiesComponent } from './territorial-enttities.component';

describe('TerritorialEnttitiesComponent', () => {
  let component: TerritorialEnttitiesComponent;
  let fixture: ComponentFixture<TerritorialEnttitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TerritorialEnttitiesComponent]
    });
    fixture = TestBed.createComponent(TerritorialEnttitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
