import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rmap } from './rmap';

describe('Rmap', () => {
  let component: Rmap;
  let fixture: ComponentFixture<Rmap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rmap],
    }).compileComponents();

    fixture = TestBed.createComponent(Rmap);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
