import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveSentComponent } from './active-sent.component';

describe('ActiveSentComponent', () => {
  let component: ActiveSentComponent;
  let fixture: ComponentFixture<ActiveSentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveSentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveSentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
