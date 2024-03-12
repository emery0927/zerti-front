import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerritorialEntitiesComponent } from './territorial-entities.component';

describe('TerritorialEntitiesComponent', () => {
  let component: TerritorialEntitiesComponent;
  let fixture: ComponentFixture<TerritorialEntitiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TerritorialEntitiesComponent]
    });
    fixture = TestBed.createComponent(TerritorialEntitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
