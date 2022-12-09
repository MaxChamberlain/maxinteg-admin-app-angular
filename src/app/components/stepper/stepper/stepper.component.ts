import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.css']
})
export class StepperComponent {
  constructor(
  ) {}

  @Input() steps: any;
  @Input() stepIndex: number = 0;

  lessThan(index: number) {
    return this.stepIndex < index;
  }

  greaterThan(index: number) {
    return this.stepIndex > index;
  }
}
