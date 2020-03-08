import { TestBed } from '@angular/core/testing';

import { TimetablesServiceService } from './timetables-service.service';

describe('TimetablesServiceService', () => {
  let service: TimetablesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimetablesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
