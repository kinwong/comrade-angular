import { TestBed } from '@angular/core/testing';

import { LogService, LogConfig } from './log.service';
import { StringArrayLogWriter } from './log-writers';

describe('LogService', () => {
  let service: LogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LogService, useClass: LogService },
        {
          provide: LogConfig,
          useValue: {
            writers: [
              {
                name: 'string-array',
                config: {
                  minLevel: 'debug',
                },
              },
            ],
          },
        },
      ],
    });
    service = TestBed.inject(LogService);
  });
  it('should be created', () => {
    expect(service).toBeTruthy();
    expect(service.writers.length).toEqual(1);
    expect(service.writers[0]).toBeTruthy();
  });
  it('should log message and objects with different severity level', () => {
    const data1 = {
      number: 12345,
      string: 'This is a string.',
    };
    const data2 = {
      number: 67890,
      string: 'This is another string.',
    };
    service.debug('This is debug message.', data1, data2);
    service.info('This is info message.', data2, data1);
    service.warn('This is warning message.', data1, data2);
    service.error('This is error message.', data2, data1);

    const writer = service.writers[0] as StringArrayLogWriter;
    expect(writer.lines.length).toEqual(4);
    expect(writer.lines[0]).toEqual(
      '[DEBUG]:This is debug message.-[{"number":12345,"string":"This is a string."},' +
      '{"number":67890,"string":"This is another string."}]'
    );
    expect(writer.lines[1]).toEqual(
      '[INFO]:This is info message.-[{"number":67890,"string":"This is another string."},' +
      '{"number":12345,"string":"This is a string."}]'
    );
    expect(writer.lines[2]).toEqual(
      '[WARN]:This is warning message.-[{"number":12345,"string":"This is a string."},' +
      '{"number":67890,"string":"This is another string."}]'
    );
    expect(writer.lines[3]).toEqual(
      '[ERROR]:This is error message.-[{"number":67890,"string":"This is another string."},' +
      '{"number":12345,"string":"This is a string."}]'
    );
  });

  it('should clear the log', () => {
    const count = 100;
    for (let i = 0; i < count; i++) {
      service.info(`This is line ${i.toString()}`, {index: i});
    }
    const writer = service.writers[0] as StringArrayLogWriter;
    expect(writer.lines.length).toEqual(count);
    writer.clear();
    expect(writer.lines.length).toEqual(0);
  });
});

describe('LogService - Configuration', () => {
  let service: LogService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LogService, useClass: LogService },
        {
          provide: LogConfig,
          useValue: {
            writers: [
              {
                name: 'string-array',
                config: {
                  minLevel: 'warn',
                },
              },
            ],
          },
        },
      ],
    });
    service = TestBed.inject(LogService);
  });
  it('should log only above minimum severity level', () => {
    service.debug('This is debug message.');
    service.info('This is info message.');
    service.warn('This is warning message.');
    service.error('This is error message.');

    const writer = service.writers[0] as StringArrayLogWriter;
    expect(writer.lines.length).toEqual(2);

    expect(writer.lines[0]).toEqual('[WARN]:This is warning message.');
    expect(writer.lines[1]).toEqual('[ERROR]:This is error message.');
  });
});
