import { TestBed } from '@angular/core/testing';

import { VirtualExhibitionService } from './virtual-exhibition.service';

describe('VirtualExhibitionService', () => {
  let service: VirtualExhibitionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VirtualExhibitionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
