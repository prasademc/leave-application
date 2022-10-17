import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveRequestShellComponent } from './leave-request-shell.component';

describe('LeaveRequestShellComponent', () => {
  let component: LeaveRequestShellComponent;
  let fixture: ComponentFixture<LeaveRequestShellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveRequestShellComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveRequestShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
