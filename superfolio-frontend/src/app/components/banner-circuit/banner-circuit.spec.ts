import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerCircuit } from './banner-circuit';

describe('BannerCircuit', () => {
  let component: BannerCircuit;
  let fixture: ComponentFixture<BannerCircuit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerCircuit],
    }).compileComponents();

    fixture = TestBed.createComponent(BannerCircuit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
