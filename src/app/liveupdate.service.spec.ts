import { TestBed } from '@angular/core/testing';

import { LiveupdateService } from './liveupdate.service';

describe('LiveupdateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LiveupdateService = TestBed.get(LiveupdateService);
    expect(service).toBeTruthy();
  });
});
