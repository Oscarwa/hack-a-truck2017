import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerCheckoutComponent } from './trailer-checkout.component';

describe('TrailerCheckoutComponent', () => {
  let component: TrailerCheckoutComponent;
  let fixture: ComponentFixture<TrailerCheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailerCheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailerCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
