import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Snell } from './snell';

describe('Snell', () => {
  let component: Snell;
  let fixture: ComponentFixture<Snell>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Snell],
    }).compileComponents();

    fixture = TestBed.createComponent(Snell);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
