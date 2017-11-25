import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrailerAddComponent } from './trailer-add.component';

describe('TrailerAddComponent', () => {
  let component: TrailerAddComponent;
  let fixture: ComponentFixture<TrailerAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrailerAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrailerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
