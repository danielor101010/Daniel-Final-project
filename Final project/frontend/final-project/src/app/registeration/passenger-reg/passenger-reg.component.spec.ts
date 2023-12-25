import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassengerRegComponent } from './passenger-reg.component';

describe('PassengerRegComponent', () => {
  let component: PassengerRegComponent;
  let fixture: ComponentFixture<PassengerRegComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassengerRegComponent]
    });
    fixture = TestBed.createComponent(PassengerRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
