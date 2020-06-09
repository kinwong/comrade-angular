import { TestBed } from '@angular/core/testing';

import { LogService, LogConfig } from './log.service';

describe('LogService', () => {
  let service: LogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LogService, useClass: LogService },
        { provide: LogConfig, }
      ]
    });
    service = TestBed.inject(LogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
