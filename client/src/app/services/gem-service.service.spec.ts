import { TestBed } from '@angular/core/testing';

import { GemServiceService } from './gem-service.service';

describe('GemServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GemServiceService = TestBed.get(GemServiceService);
    expect(service).toBeTruthy();
  });
});
