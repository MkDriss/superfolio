import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LetsGoBiking } from './lets-go-biking';

describe('LetsGoBiking', () => {
  let component: LetsGoBiking;
  let fixture: ComponentFixture<LetsGoBiking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LetsGoBiking],
    }).compileComponents();

    fixture = TestBed.createComponent(LetsGoBiking);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
