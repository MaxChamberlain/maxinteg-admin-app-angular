import { Component } from '@angular/core';
import { ProjectService } from '../../../project.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { StepperComponent } from '../../../components/stepper/stepper/stepper.component';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {
  constructor(
    private projectService: ProjectService,
    private formBuilder: FormBuilder,
    public stepperComponent: StepperComponent,
  ) {}

  stepIndex = 0;

    steps = [
      {label: 'Project Details', icon: 'fa fa-info-circle'},
      {label: 'Front End', icon: 'fa fa-code'},
      {label: 'Back End', icon: 'fa fa-code'},
      {label: 'Everything Else', icon: 'fa fa-server'},
    ]

  addProjectForm = this.formBuilder.group({
    project_name: '',
    project_description: '',
    project_start_date: '',
    project_end_date: '',
    project_priority: '',
    project_front_end_github: '',
    project_back_end_github: '',
    project_front_end_url: '',
    project_back_end_url: '',
    project_front_end_hosting_url: '',
    project_back_end_hosting_url: '',
    project_front_end_hosting_provider: '',
    project_back_end_hosting_provider: '',
  });

  onSubmit() {
    this.projectService.createProject({
      project_name: this.addProjectForm.value.project_name,
      project_description: this.addProjectForm.value.project_description,
      project_start_date: this.addProjectForm.value.project_start_date,
      project_end_date: this.addProjectForm.value.project_end_date,
      project_priority: this.addProjectForm.value.project_priority,
      project_front_end_github: this.addProjectForm.value.project_front_end_github,
      project_back_end_github: this.addProjectForm.value.project_back_end_github,
      project_front_end_url: this.addProjectForm.value.project_front_end_url,
      project_back_end_url: this.addProjectForm.value.project_back_end_url,
      project_front_end_hosting_url: this.addProjectForm.value.project_front_end_hosting_url,
      project_back_end_hosting_url: this.addProjectForm.value.project_back_end_hosting_url,
      project_front_end_hosting_provider: this.addProjectForm.value.project_front_end_hosting_provider,
      project_back_end_hosting_provider: this.addProjectForm.value.project_back_end_hosting_provider,
      authorized_users: [],
    }).subscribe((data: any) => {
      console.log(data);
    });
  }

  setStep(index: number) {
    this.stepIndex = index;
  }

  nextStep() {
    this.stepIndex++;
  }

  prevStep() {
    this.stepIndex--;
  }

  get step() {
    return this.stepIndex;
  }

  lessThan(index: number) {
    return this.stepIndex < index;
  }

  greaterThan(index: number) {
    return this.stepIndex > index;
  }
}
