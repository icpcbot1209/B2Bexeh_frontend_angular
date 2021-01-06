import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedReceivedComponent } from './closed-received.component';

describe('ClosedReceivedComponent', () => {
  let component: ClosedReceivedComponent;
  let fixture: ComponentFixture<ClosedReceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedReceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedReceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
