import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PictureLightbox } from './picture-lightbox';

describe('PictureLightbox', () => {
  let component: PictureLightbox;
  let fixture: ComponentFixture<PictureLightbox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PictureLightbox],
    }).compileComponents();

    fixture = TestBed.createComponent(PictureLightbox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
