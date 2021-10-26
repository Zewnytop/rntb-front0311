import { TestBed } from '@angular/core/testing';

import { SitePageService } from './site-page.service';

describe('SitePageService', () => {
  let service: SitePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SitePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
