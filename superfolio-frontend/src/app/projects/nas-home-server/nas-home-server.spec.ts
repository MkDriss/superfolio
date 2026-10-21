import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NasHomeServer } from './nas-home-server';

describe('NasHomeServer', () => {
  let component: NasHomeServer;
  let fixture: ComponentFixture<NasHomeServer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NasHomeServer],
    }).compileComponents();

    fixture = TestBed.createComponent(NasHomeServer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
