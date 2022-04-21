import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveDriverComponent } from './active-driver.component';

describe('ActiveDriverComponent', () => {
  let component: ActiveDriverComponent;
  let fixture: ComponentFixture<ActiveDriverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveDriverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveDriverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
