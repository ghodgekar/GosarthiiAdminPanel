import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverEnrollmentComponent } from './driver-enrollment.component';

describe('DriverEnrollmentComponent', () => {
  let component: DriverEnrollmentComponent;
  let fixture: ComponentFixture<DriverEnrollmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DriverEnrollmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DriverEnrollmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
