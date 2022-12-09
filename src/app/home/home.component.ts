import { Component, ViewChild } from '@angular/core';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private projectService: ProjectService,
  ) {}
  
  projectsList: [{
    project_id: string;
    project_name: string;
    project_description: string;
    project_start_date: string;
    project_end_date: string;
    project_priority: string;
    project_front_end_github: string;
    project_back_end_github: string;
    project_front_end_url: string;
    project_back_end_url: string;
    project_front_end_hosting_url: string;
    project_back_end_hosting_url: string;
    project_front_end_hosting_provider: string;
    project_back_end_hosting_provider: string;
  }] | undefined

  ngOnInit() {
    this.projectService.getProjects()
      .subscribe((projectsList: any) => {
        this.projectsList = projectsList.sort((a: any, b: any) => {
          return a.updated_at < b.updated_at ? 1 : -1;
        });
      });
  }

  proper(text: string){
    return text.split(' ').map((word: string) => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    }).join(' ')
  }

}