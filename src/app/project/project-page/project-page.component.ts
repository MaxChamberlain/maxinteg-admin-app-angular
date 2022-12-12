import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../project.service';
import { ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/services/socket.service';
import { trigger, transition, style, animate, keyframes, state } from '@angular/animations';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css'],
  animations: [
    trigger('listAnimation', [
      state('void', style({ opacity: 0, transform: 'translateY(-50%)' })),
      transition('void => *', [
        animate('250ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', keyframes([
          style({ offset: 0, opacity: 0, transform: 'translateY(-50%)' }),
          style({ offset: 0.25, opacity: 0.25, transform: 'translateY(-25%)' }),
          style({ offset: 0.75, opacity: 0.75, transform: 'translateY(25%)' }),
          style({ offset: 1, opacity: 1, transform: 'translateY(0)' })
        ]))
      ]),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('* => void', [
        animate('250ms cubic-bezier(0.175, 0.885, 0.32, 1.275)', keyframes([
          style({ offset: 0, opacity: 1, transform: 'translateY(0)' }),
          style({ offset: 0.25, opacity: 0.75, transform: 'translateY(-25%)' }),
          style({ offset: 0.75, opacity: 0.25, transform: 'translateY(-50%)' }),
          style({ offset: 1, opacity: 0, transform: 'translateY(-50%)' })
        ]))
      ])
    ])
    ]
})
export class ProjectPageComponent implements OnInit {
  constructor(
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private socketService: SocketService
  ) {  }

  loading: boolean = true;

  openSubtasks: string[] = [];
  
  projectDetails: Map<string, string> = new Map( Object.entries({
    created_at: '',
    owner_id: '',
    project_back_end_github: '',
    project_back_end_hosting_provider: '',
    project_back_end_hosting_url: '',
    project_back_end_url: '',
    project_description: '',
    project_end_date: '',
    project_front_end_github: '',
    project_front_end_hosting_provider: '',
    project_front_end_hosting_url: '',
    project_front_end_url: '',
    project_id: '',
    project_name: '',
    project_priority: '',
    project_start_date: '',
    status: '',
    updated_at: '',
  }) );

  taskItems: [{
      task_id: string,
      task_description: string,
      task_priority: number,
      task_status: string,
      subtasks: undefined | [{
        subtask_id: string,
        subtask_description: string,
        subtask_priority: number,
        subtask_status: string,
      }],
    }] | undefined

    completedItems: [{
        task_id: string,
        task_description: string,
        task_priority: number,
        task_status: string,
        subtasks: undefined | [{
          subtask_id: string,
          subtask_description: string,
          subtask_priority: number,
          subtask_status: string,
        }],
      }] | undefined

    newTask: {
      task_id: string,
      task_description: string,
      task_priority: number,
      task_status: string,
      subtasks: undefined | [{
        subtask_id: string,
        subtask_description: string,
        subtask_priority: number,
        subtask_status: string,
      }],
    } = {
      task_id: '',
      task_description: '',
      task_priority: 1,
      task_status: 'None',
      subtasks: undefined,
    }

  data: any = undefined
  id = this.route.snapshot.paramMap.get('id');

  ngOnInit() {

    if(this.id){
      this.projectService.getProject(this.id).subscribe((data) => {
        this.projectDetails = new Map(Object.entries(data));
        this.loading = false;
      });
    }
    this.socketService.listen().subscribe((data: any) => {
      if(data){
        let incompleteTasks = data.filter((task: any) => task.task_status !== 'Complete')
        let completedTasks = data.filter((task: any) => task.task_status === 'Complete')

        if(!this.taskItems){
          this.taskItems = incompleteTasks
        }
        if(!this.completedItems){
          this.completedItems = completedTasks
        }

        incompleteTasks.forEach((task: any) => {
          if(!this.taskItems?.some((newTask: any) => newTask.task_id === task.task_id)){
            this.taskItems?.push(task)
          }
        })

        completedTasks.forEach((task: any) => {
          if(!this.completedItems?.some((newTask: any) => newTask.task_id === task.task_id)){
            this.completedItems?.push(task)
          }
        })
      }
    })
    this.socketService.emit('tasks', this.id)
    
  }

  emit(event: string, data: any){
    this.socketService.emit(event, data);
  }

  setNewTasks(){
    if(this.getNewTaskActivated()){
      this.newTask.task_id = Math.random().toString(36).slice(2, 9)
      if(this.newTask.task_status === 'Complete'){
        this.completedItems?.push(this.newTask)
      } else {
        this.taskItems?.push(this.newTask)
      }
      this.resetNewTask()
    }
    if(this.taskItems && this.completedItems){
      this.socketService.setNewTasks(this.id, [...this.taskItems, ...this.completedItems])
    }
  }
  
  getStatusColor(status: string){
    return status ? 
      status === 'Active' ? 
          'hsl(100, 110%, 35%)' : 
        status === 'In Progress' ? 
          'hsl(35, 110%, 35%)' : 
        status === 'Awaiting Review' ? 
          'hsl(45, 110%, 35%)' : 
        status === 'None' ? 
          'hsl(220, 25%, 15%)' : 
        status === 'Complete' ? 
          'hsl(220, 25%, 15%)' : 
        'hsl(0, 100%, 60%)' : 
      'hsl(220, 25%, 15%)'
  }

  getNewTaskActivated(){
    if(this.newTask.task_description !== ''){
      return true
    }else{
      return false
    }
  }

  resetNewTask(){
    this.newTask = {
      task_id: '',
      task_description: '',
      task_priority: 1,
      task_status: 'None',
      subtasks: undefined,
    }
  }

  newSubtask(task: any){
    console.log('new subtask')
    if(task.subtasks){
      task.subtasks.push({
        subtask_id: '',
        subtask_description: '',
        subtask_priority: 1,
        subtask_status: 'None',
      })
    }else{
      task.subtasks = [{
        subtask_id: Math.random().toString(36).slice(2, 9),
        subtask_description: '',
        subtask_priority: 1,
        subtask_status: 'None',
      }]
    }
  }

  getRandomColor(){
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`
    return color
  }

  deleteTask(id: string){
    const newTaskItems: any = this.taskItems?.filter((task: any) => task.task_id !== id)
    const newCompletedItems: any = this.completedItems?.filter((task: any) => task.task_id !== id)
    this.taskItems = newTaskItems
    this.completedItems = newCompletedItems
    this.setNewTasks()
  }

  deleteSubTask(task_id: any, id: string){
    const newSubtasks: any = this.taskItems?.find((task: any) => task.task_id === task_id)?.subtasks?.filter((subtask: any) => subtask.subtask_id !== id)
    const newTaskItems: any = this.taskItems?.map((task: any) => {
      if(task.task_id === task_id){
        task.subtasks = newSubtasks
      }
      return task
    })
    this.taskItems = newTaskItems
  }

  getStarColor(index: number, priority: number){
    return priority >= index ? '-webkit-text-fill-color:yellow' : '-webkit-text-fill-color:rgba(0,0,0,0.2)'
  }

  getSideColor(str: string){
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let hue = Math.abs(hash % 360);
    return `hsl(${hue}, 100%, 50%)`;
  }

  updateOnlyOnBlur(task: any){console.log('test')
  }
}
