import { TestBed } from '@angular/core/testing';

import { HandleMemberService } from './handle-member.service';

describe('HandleMemberService', () => {
  let service: HandleMemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleMemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
