import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCallLogs } from './view-call-logs';

describe('ViewCallLogs', () => {
  let component: ViewCallLogs;
  let fixture: ComponentFixture<ViewCallLogs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCallLogs],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewCallLogs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
