import { TestBed, inject } from '@angular/core/testing';

import { DetailsResolver } from './details-resolver.service';

describe('DetailsResolver', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DetailsResolver]
    });
  });

  it('should be created', inject([DetailsResolver], (service: DetailsResolver) => {
    expect(service).toBeTruthy();
  }));
});
