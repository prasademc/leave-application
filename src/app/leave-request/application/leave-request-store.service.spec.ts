import { TestBed } from '@angular/core/testing';

import { LeaveRequestStoreService } from './leave-request-store.service';

describe('LeaveRequestStoreService', () => {
  let service: LeaveRequestStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveRequestStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
