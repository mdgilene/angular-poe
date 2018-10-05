import { TestBed } from '@angular/core/testing';

import { UniqueItemService } from './unique-item.service';

describe('ItemService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UniqueItemService = TestBed.get(UniqueItemService);
    expect(service).toBeTruthy();
  });
});
