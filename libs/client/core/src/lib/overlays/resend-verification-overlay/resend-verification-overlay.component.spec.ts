import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendVerificationOverlayComponent } from './resend-verification-overlay.component';

describe('ResendVerificationOverlayComponent', () => {
  let component: ResendVerificationOverlayComponent;
  let fixture: ComponentFixture<ResendVerificationOverlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResendVerificationOverlayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResendVerificationOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
