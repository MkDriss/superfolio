import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectFilterPanel } from './project-filter-panel';

describe('ProjectFilterPanel', () => {
  let component: ProjectFilterPanel;
  let fixture: ComponentFixture<ProjectFilterPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectFilterPanel],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectFilterPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
