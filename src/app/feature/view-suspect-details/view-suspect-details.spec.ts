import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSuspectDetails } from './view-suspect-details';

describe('ViewSuspectDetails', () => {
  let component: ViewSuspectDetails;
  let fixture: ComponentFixture<ViewSuspectDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSuspectDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewSuspectDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
