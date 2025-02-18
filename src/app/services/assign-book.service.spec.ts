import { TestBed } from '@angular/core/testing';

import { AssignBookService } from './assign-book.service';

describe('AssignBookService', () => {
  let service: AssignBookService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignBookService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
