import { TestBed } from '@angular/core/testing';

import { ComradeAngularService } from './comrade-angular.service';

describe('ComradeAngularService', () => {
  let service: ComradeAngularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComradeAngularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
