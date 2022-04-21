import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeactivatedDriverComponent } from './deactivated-driver.component';

describe('DeactivatedDriverComponent', () => {
  let component: DeactivatedDriverComponent;
  let fixture: ComponentFixture<DeactivatedDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeactivatedDriverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeactivatedDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
