import { TestBed } from '@angular/core/testing';

import { HTTPService } from "./http-service.service";

describe('HTTPServiceService', () => {
  let service: HTTPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HTTPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
