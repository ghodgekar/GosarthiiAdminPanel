import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelfEnrolledDriverDetailsComponent } from './self-enrolled-driver-details.component';

describe('SelfEnrolledDriverDetailsComponent', () => {
  let component: SelfEnrolledDriverDetailsComponent;
  let fixture: ComponentFixture<SelfEnrolledDriverDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelfEnrolledDriverDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelfEnrolledDriverDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
