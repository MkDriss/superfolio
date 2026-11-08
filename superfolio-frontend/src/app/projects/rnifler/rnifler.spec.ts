import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Rnifler } from './rnifler';

describe('Rnifler', () => {
  let component: Rnifler;
  let fixture: ComponentFixture<Rnifler>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Rnifler],
    }).compileComponents();

    fixture = TestBed.createComponent(Rnifler);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
