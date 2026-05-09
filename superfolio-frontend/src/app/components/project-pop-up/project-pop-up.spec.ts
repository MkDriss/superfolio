import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectPopUp } from './project-pop-up';

describe('ProjectPopUp', () => {
  let component: ProjectPopUp;
  let fixture: ComponentFixture<ProjectPopUp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectPopUp],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectPopUp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
