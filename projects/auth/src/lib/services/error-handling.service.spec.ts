import { TestBed } from '@angular/core/testing';

import { ErrorHandlingService } from './error-handling.service';

describe('ErrorHandlingService', () => {
  let service: ErrorHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle errors', () => {
    expect(service.handleError({ code: 'auth/weak-password' })).toBe(
      'The password is too weak.'
    );
  });

  it('should handle errors without error code', () => {
    expect(service.handleError({})).toBe('An unexpected error occurred.');
  });
});
