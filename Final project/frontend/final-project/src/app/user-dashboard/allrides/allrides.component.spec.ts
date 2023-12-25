import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllridesComponent } from './allrides.component';

describe('AllridesComponent', () => {
  let component: AllridesComponent;
  let fixture: ComponentFixture<AllridesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllridesComponent]
    });
    fixture = TestBed.createComponent(AllridesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
