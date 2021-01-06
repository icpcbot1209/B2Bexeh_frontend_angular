import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedSentComponent } from './closed-sent.component';

describe('ClosedSentComponent', () => {
  let component: ClosedSentComponent;
  let fixture: ComponentFixture<ClosedSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedSentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
