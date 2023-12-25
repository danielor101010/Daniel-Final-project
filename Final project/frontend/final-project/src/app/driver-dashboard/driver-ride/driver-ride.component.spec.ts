import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverRideComponent } from './driver-ride.component';

describe('DriverRideComponent', () => {
  let component: DriverRideComponent;
  let fixture: ComponentFixture<DriverRideComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DriverRideComponent]
    });
    fixture = TestBed.createComponent(DriverRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
