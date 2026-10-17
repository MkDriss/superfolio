import { Component } from '@angular/core';
import { SNELL } from '../../mocks/project.mock';
import { Project } from '../../model/project.model';
import { ProjectHeader } from '../../components/project-header/project-header';

@Component({
  selector: 'app-snell',
  imports: [ProjectHeader],
  templateUrl: './snell.html',
  styleUrl: './snell.scss',
})
export class Snell {
  public readonly snell:Project = SNELL;
}
