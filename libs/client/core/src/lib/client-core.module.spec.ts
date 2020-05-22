import { async, TestBed } from '@angular/core/testing';
import { ClientCoreModule } from './client-core.module';

describe('ClientCoreModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ClientCoreModule],
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ClientCoreModule).toBeDefined();
  });
});
