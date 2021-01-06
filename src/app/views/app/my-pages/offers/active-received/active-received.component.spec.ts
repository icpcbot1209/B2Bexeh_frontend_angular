import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveReceivedComponent } from './active-received.component';

describe('ActiveReceivedComponent', () => {
  let component: ActiveReceivedComponent;
  let fixture: ComponentFixture<ActiveReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
