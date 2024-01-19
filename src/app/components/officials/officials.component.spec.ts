import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficialsComponent } from './officials.component';

describe('OfficialsComponent', () => {
  let component: OfficialsComponent;
  let fixture: ComponentFixture<OfficialsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfficialsComponent]
    });
    fixture = TestBed.createComponent(OfficialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
