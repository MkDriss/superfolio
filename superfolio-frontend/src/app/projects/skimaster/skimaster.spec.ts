import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Skimaster } from './skimaster';

describe('Skimaster', () => {
  let component: Skimaster;
  let fixture: ComponentFixture<Skimaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Skimaster],
    }).compileComponents();

    fixture = TestBed.createComponent(Skimaster);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
