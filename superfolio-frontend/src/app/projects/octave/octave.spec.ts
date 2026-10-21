import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Octave } from './octave';

describe('Octave', () => {
  let component: Octave;
  let fixture: ComponentFixture<Octave>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Octave],
    }).compileComponents();

    fixture = TestBed.createComponent(Octave);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
