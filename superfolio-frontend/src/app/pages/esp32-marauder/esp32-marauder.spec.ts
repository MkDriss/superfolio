import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Esp32Marauder } from './esp32-marauder';

describe('Esp32Marauder', () => {
  let component: Esp32Marauder;
  let fixture: ComponentFixture<Esp32Marauder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Esp32Marauder],
    }).compileComponents();

    fixture = TestBed.createComponent(Esp32Marauder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
