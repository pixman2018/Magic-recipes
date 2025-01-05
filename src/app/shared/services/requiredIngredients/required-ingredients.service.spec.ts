import { TestBed } from '@angular/core/testing';

import { RequiredIngredientsService } from './required-ingredients.service';

describe('RequiredIngredientsService', () => {
  let service: RequiredIngredientsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequiredIngredientsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
