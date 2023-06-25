import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferChildComponent } from './offer-child.component';

describe('OfferChildComponent', () => {
  let component: OfferChildComponent;
  let fixture: ComponentFixture<OfferChildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferChildComponent]
    });
    fixture = TestBed.createComponent(OfferChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
