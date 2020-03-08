import { TestBed } from '@angular/core/testing';

import { PeopleTimetableManagerService } from './people-timetable-manager.service';

describe('PeopleTimetableManagerService', () => {
  let service: PeopleTimetableManagerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeopleTimetableManagerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
