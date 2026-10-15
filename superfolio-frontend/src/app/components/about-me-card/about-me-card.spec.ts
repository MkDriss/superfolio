import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutMeCard } from './about-me-card';

describe('AboutMeCard', () => {
  let component: AboutMeCard;
  let fixture: ComponentFixture<AboutMeCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutMeCard],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutMeCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
