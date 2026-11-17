import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RebuildingTrust } from './rebuilding-trust';

describe('RebuildingTrust', () => {
  let component: RebuildingTrust;
  let fixture: ComponentFixture<RebuildingTrust>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RebuildingTrust],
    }).compileComponents();

    fixture = TestBed.createComponent(RebuildingTrust);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
