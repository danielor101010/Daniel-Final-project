import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultRidesComponent } from './default-rides.component';

describe('DefaultRidesComponent', () => {
  let component: DefaultRidesComponent;
  let fixture: ComponentFixture<DefaultRidesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultRidesComponent]
    });
    fixture = TestBed.createComponent(DefaultRidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
