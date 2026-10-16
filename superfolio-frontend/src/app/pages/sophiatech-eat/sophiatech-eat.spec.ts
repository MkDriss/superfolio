import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SophiatechEat } from './sophiatech-eat';

describe('SophiatechEat', () => {
  let component: SophiatechEat;
  let fixture: ComponentFixture<SophiatechEat>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SophiatechEat],
    }).compileComponents();

    fixture = TestBed.createComponent(SophiatechEat);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
