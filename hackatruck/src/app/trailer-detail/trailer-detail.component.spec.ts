import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerDetailComponent } from './trailer-detail.component';

describe('TrailerDetailComponent', () => {
  let component: TrailerDetailComponent;
  let fixture: ComponentFixture<TrailerDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailerDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
