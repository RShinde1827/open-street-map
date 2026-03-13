import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuspectList } from './suspect-list';

describe('SuspectList', () => {
  let component: SuspectList;
  let fixture: ComponentFixture<SuspectList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuspectList],
    }).compileComponents();

    fixture = TestBed.createComponent(SuspectList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
