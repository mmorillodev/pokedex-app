import { TestBed } from '@angular/core/testing';

import { OfflineStorageService } from './offline_storage.service';

describe('OfflineStorageService', () => {
  let service: OfflineStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfflineStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
