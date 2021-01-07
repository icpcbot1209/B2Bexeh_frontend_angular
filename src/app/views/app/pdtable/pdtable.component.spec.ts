import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdtableComponent } from './pdtable.component';

describe('PdtableComponent', () => {
  let component: PdtableComponent;
  let fixture: ComponentFixture<PdtableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdtableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdtableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
